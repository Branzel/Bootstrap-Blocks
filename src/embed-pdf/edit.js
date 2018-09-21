/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { MediaUpload,
	MediaPlaceholder,
	BlockControls,
	RichText,
	mediaUpload,
} = wp.editor;
const { ClipboardButton,
	IconButton,
	Toolbar,
	withNotices,
} = wp.components;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { getBlobByURL, revokeBlobURL } = wp.blob;

/**
 * Internal dependencies
 */

/**
 * Module constants
 */

class BranzelEmbedPdfBlock extends Component {
	constructor() {
		super( ...arguments );
		
		this.onSelectFile = this.onSelectFile.bind( this );
		this.confirmCopyURL = this.confirmCopyURL.bind( this );

		this.state = {
			hasError: false,
		};
	}
	
	componentDidMount() {
		const { attributes, noticeOperations } = this.props;
		const { href } = attributes;

		// Upload a file drag-and-dropped into the editor
		if ( this.isBlobURL( href ) ) {
			const file = getBlobByURL( href );

			mediaUpload( {
				allowedType: 'pdf',
				filesList: [ file ],
				onFileChange: ( [ media ] ) => this.onSelectFile( media ),
				onError: ( message ) => {
					this.setState( { hasError: true } );
					noticeOperations.createErrorNotice( message );
				},
			} );

			revokeBlobURL( href );
		}
	}
	
	componentDidUpdate( prevProps ) {
		// Reset copy confirmation state when block is deselected
		if ( prevProps.isSelected && ! this.props.isSelected ) {
			this.setState( { showCopyConfirmation: false } );
		}
	}

	onSelectFile( media ) {
		if ( media && media.url ) {
			this.setState( { hasError: false } );
			this.props.setAttributes( {
				href: media.url,
				fileName: media.title,
				id: media.id,
			} );
		}
	}
	
	isBlobURL( url = '' ) {
		return url.indexOf( 'blob:' ) === 0;
	}

	confirmCopyURL() {
		this.setState( { showCopyConfirmation: true } );
	}

	resetCopyConfirmation() {
		this.setState( { showCopyConfirmation: false } );
	}

	render() {
		const { attributes, setAttributes, className, media, noticeOperations, noticeUI, isSelected } = this.props;
		const { 
			id,
			href,
			fileName
		} = attributes;
		const { hasError, showCopyConfirmation } = this.state;
		
		if ( ! href || hasError ) {
			return (
				<MediaPlaceholder
					icon="media-default"
					labels={ {
						title: __( 'File' ),
						name: __( 'a file' ),
					} }
					onSelect={ this.onSelectFile }
					notices={ noticeUI }
					onError={ noticeOperations.createErrorNotice }
					accept="*"
					type="*"
				/>
			);
		}
		
		const classes = classnames( className);
		
		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectFile }
							type="*"
							value={ id }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit file' ) }
									onClick={ open }
									icon="edit"
								/>
							) }
						/>
					</Toolbar>
				</BlockControls>
				<div className={ classes }>
					<div className={ `${ className }__content-wrapper` }>
						<RichText
							wrapperClassName={ `${ className }__textlink` }
							tagName="div" // must be block-level or else cursor disappears
							format="string"
							value={ fileName }
							multiline="false"
							placeholder={ __( 'Write file name…' ) }
							keepPlaceholderOnFocus
							formattingControls={ [] } // disable controls
							onChange={ ( text ) => setAttributes( { fileName: text } ) }
						/>
					</div>
					{ isSelected &&
						<ClipboardButton
							isDefault
							text={ href }
							className={ `${ className }__copy-url-button` }
							onCopy={ this.confirmCopyURL }
							onFinishCopy={ this.resetCopyConfirmation }
						>
							{ showCopyConfirmation ? __( 'Copied!' ) : __( 'Copy URL' ) }
						</ClipboardButton>
					}
				</div>
			</Fragment>
		);
	}
}


const BranzelEmbedPdfEdit = compose( [
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { id } = props.attributes;
		return {
			media: id === undefined ? undefined : getMedia( id ),
		};
	} ),
	withNotices,
] )( BranzelEmbedPdfBlock );

export default BranzelEmbedPdfEdit;