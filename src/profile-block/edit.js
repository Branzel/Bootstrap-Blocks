/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
import { 
	RichText,
	BlockControls, 
	AlignmentToolbar, 
	MediaUpload, 
	InspectorControls, 
	BlockAlignmentToolbar, 
	PanelColorSettings, 
	withColors, 
	getColorClassName
} from 'wp.editor';
import { 
	Toolbar, 
	TextControl, 
	Button, 
	PanelBody, 
	SelectControl 
} from 'wp.components';
const { compose } = wp.compose;

/**
 * Internal dependencies
 */

/**
 * Module constants
 */

class BranzelProfileBlock extends Component {
	constructor() {
		super( ...arguments );
		this.onChangeAlignment = this.onChangeAlignment.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );

		this.state = {
		};
	}
	
	onChangeAlignment(alignment) {
		this.props.setAttributes( { alignment } );
	}
	
	onSelectImage(media) {
		return this.props.setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};

	render() {
		const { attributes, setAttributes, className, accentColor, setAccentColor } = this.props;
		const { 
			mediaURL = "", 
			mediaID, 
			title,
			subtitle,
			bio,
			alignment, 
			facebookURL, 
			twitterURL, 
			instagramURL, 
			linkedURL, 
			emailAddress,
			theme = 'BeMSABoard',
		} = attributes;
		
		const accentBorderClass = getColorClassName( 'border', accentColor );
		const accentColorClass = getColorClassName( 'color', accentColor );
		
		const classNameNew = classnames('bemsatheme', {
			[ className ]: className,
		} );
		
		const socialLinkClassName = classnames('social-link', {
			[accentColorClass]:accentColorClass}
		);
		
		const socialLinkStyle = {
			color: ( accentColorClass ? undefined : customAccentColor )
		};
			
		const controls = (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectImage }
							type="image"
							value={ mediaID }
							render={ ( { open } ) => (
								<Button
									className="components-toolbar__control"
									label={ __( 'Edit image' ) }
									onClick={ open }
								>
									<svg className='dashicon dashicons-edit'
										width='20'
										height='20'
									>
										<path d="M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z"/>
									</svg>
								</Button>
							) }
						/>
					</Toolbar>
					<BlockAlignmentToolbar
						value={ alignment }
						onChange={ this.onChangeAlignment }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Theme' ) } className="block-theme">
							<SelectControl
								label="Theme"
								value={ theme }
								options={ [
									{ label: __('BeMSA Board Theme'), value: 'BeMSABoard' },
									{ label: __('BeMSA Project Responsible Theme'), value: 'BeMSAPrRes' },
								] }
								onChange={ ( theme ) => this.props.setAttributes({ theme }) }
							/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: accentColor.value,
								onChange: setAccentColor,
								label: __( 'Accent Color' ),
							},
						] }
					>
					</PanelColorSettings>
					<PanelBody title={ __( 'Social Media Links' ) } className="block-social-links">
						<p>{ __( 'Add links to your social media profiles.' ) }</p>
						<TextControl
							type='url'
							label={ __( 'Facebook URL' ) }
							value={ facebookURL }
							onChange={ ( facebookURL ) => this.props.setAttributes( { facebookURL } ) }
						/>
						<TextControl
							type='url'
							label={ __( 'Twitter URL' ) }
							value={ twitterURL }
							onChange={ ( twitterURL ) => this.props.setAttributes( { twitterURL } ) }
						/>
						<TextControl
							type='url'
							label={ __( 'Instagram URL' ) }
							value={ instagramURL }
							onChange={ ( instagramURL ) => this.props.setAttributes( { instagramURL } ) }
						/>
						<TextControl
							type='url'
							label={ __( 'LinkedIn URL' ) }
							value={ linkedURL }
							onChange={ ( linkedURL ) => this.props.setAttributes( { linkedURL } ) }
						/>
						<TextControl
							type='text'
							label={ __( 'Email Address' ) }
							value={ emailAddress }
							onChange={ ( emailAddress ) => this.props.setAttributes( { emailAddress } ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
		
		if ( theme == 'BeMSABoard' ) {
			
			return (
				<Fragment>
					{ controls }
					<div className={ classNameNew }>
						<div className={ classnames('container', {
							[accentBorderClass]:accentBorderClass}
						) }
							style={ { 
								border: '1px solid ' + ( accentBorderClass ? '' : customAccentColor )
							} }
						>
							<div className="row">
								<div className='col-xs-12 col-sm-12 organic-profile-image'
									style={ {
										backgroundImage: ( mediaURL ? 'url('+ mediaURL+')' : undefined )
									} }
								>
									<MediaUpload 
										onSelect={ this.onSelectImage }
										type='image'
										value={ mediaID }
										render={ (obj) => {
											return (
												<Button
													className='button button-large'
													onClick={ obj.open }
												>
												{ __( 'Select Image' ) }
												</Button>);
										} }
									/>
								</div>
								<div className='col-xs-12 col-sm-12 organic-profile-content'
									style={ { textAlign: alignment } }>
									<RichText
										tagName='h3'
										placeholder={ __('Profile Name') }
										keepPlaceholderOnFocus={ true }
										value={ title }
										isSelected={ false }
										onChange={ (title) => this.props.setAttributes( { title } ) }
									/>
									<RichText
										tagName='h5'
										placeholder={ __('Subtitle') }
										keepPlaceholderOnFocus={ true }
										value={ subtitle }
										isSelected={ false }
										onChange={ (subtitle) => this.props.setAttributes( { subtitle } ) }
									/>
									<RichText
										tagName='p'
										placeholder={ __('Write a brief bio...') }
										keepPlaceholderOnFocus={ true }
										value={ bio }
										onChange={ (bio) => this.props.setAttributes( { bio } ) }
									/>
									<div className='organic-profile-social'>
										{ facebookURL && <a 
											className={ socialLinkClassName }
											style={ socialLinkStyle }
											href={ facebookURL }
											target='_blank'
											><i className='fab fa-facebook-f'/>
											</a>
										}
										{ twitterURL && <a 
											className={ socialLinkClassName }
											style={ socialLinkStyle }
											href={ twitterURL }
											target='_blank'
											><i className='fab fa-twitter'/>
											</a>
										}
										{ instagramURL && <a 
											className={ socialLinkClassName }
											style={ socialLinkStyle }
											href={ instagramURL }
											target='_blank'
											><i className='fab fa-instagram'/>
											</a>
										}
										{ linkedURL && <a 
											className={ socialLinkClassName }
											style={ socialLinkStyle }
											href={ linkedURL }
											target='_blank'
											><i className='fab fa-linkedin-in'/>
											</a>
										}
										{ emailAddress && <a 
											className={ socialLinkClassName }
											style={ socialLinkStyle }
											href={ 'mailto:' + emailAddress }
											target='_blank'
											><i className='fas fa-envelope'/>
											</a>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			);
		} else if ( theme == 'BeMSAPrRes' ) {
			return (
				<Fragment>
					{ controls }
					<div className={ "container" + ( className ? " " + className : '' ) }>
						<div className="row">
							<div 
								className="col-xs-12 col-sm-4 organic-profile-image"
								style={ mediaID && { backgroundImage: 'url('+ mediaURL +')' } }
							>
								<MediaUpload 
									onSelect={ this.onSelectImage }
									type='image'
									value={ mediaID }
									render={ (obj) => {
										return (
											<Button
												className='button button-large'
												onClick={ obj.open }
											>
											{ __( 'Select Image' ) }
											</Button>);
									} }
								/>
							</div>
							<div 
								className='col-xs-12 col organic-profile-content'
								style={ { textAlign: alignment } }
							>
								<RichText
									tagName='h3'
									placeholder={ __('Profile Name') }
									keepPlaceholderOnFocus={ true }
									value={ title }
									isSelected={ false }
									onChange={ (title) => this.props.setAttributes( { title } ) }
								/>
								<RichText
									tagName='h5'
									placeholder={ __('Subtitle') }
									keepPlaceholderOnFocus={ true }
									value={ subtitle }
									isSelected={ false }
									onChange={ (subtitle) => this.props.setAttributes( { subtitle } ) }
								/>
								<RichText
									tagName='p'
									placeholder={ __('Write a brief bio...') }
									keepPlaceholderOnFocus={ true }
									value={ bio }
									onChange={ (bio) => this.props.setAttributes( { bio } ) }
								/>
								<div 
									className='organic-profile-social'
								>
								{ facebookURL && <a 
									className='social-link'
									href={ facebookURL }
									target='_blank'
									style={ {
										color: accentColor.value
									} }
									><i className='fab fa-facebook-f'/>
									</a>
								}
								{ twitterURL && <a 
									className='social-link'
									href={ twitterURL }
									target='_blank'
									style={ {
										color: accentColor.value
									} }
									><i className='fab fa-twitter'/>
									</a>
								}
								{ instagramURL && <a 
									className='social-link'
									href={ instagramURL }
									target='_blank'
									style={ {
										color: accentColor.value
									} }
									><i className='fab fa-instagram'/>
									</a>
								}
								{ linkedURL && <a 
									className='social-link'
									href={ linkedURL }
									target='_blank'
									style={ {
										color: accentColor.value
									} }
									><i className='fab fa-linkedin-in'/>
									</a>
								}
								{ emailAddress && <a 
									className='social-link'
									href={ 'mailto:' + emailAddress }
									target='_blank'
									style={ {
										color: accentColor.value
									} }
									><i className='fas fa-envelope'/>
									</a>
								}
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			);
		}
		
		return (
			<Fragment>
				{ controls }
				<div className={ "container" + ( className ? " " + className : '' ) }>
					<div className="row">
						<div 
							className="col-xs-12 col-sm-4 organic-profile-image"
							style={ mediaID && { backgroundImage: 'url('+ mediaURL +')' } }
						>
							<MediaUpload 
								onSelect={ this.onSelectImage }
								type='image'
								value={ mediaID }
								render={ (obj) => {
									return (
										<Button
											className={ mediaID ? 'image-button' : 'button button-large' }
											onClick={ obj.open }
										>
										{ ! mediaID ? __( 'Upload Image' ) : <img src={ mediaURL }/> }
										</Button>);
								} }
							/>
						</div>
						<div 
							className='col-xs-12 col organic-profile-content'
							style={ { textAlign: alignment } }
						>
							<RichText
								tagName='h3'
								placeholder={ __('Profile Name') }
								keepPlaceholderOnFocus={ true }
								value={ title }
								isSelected={ false }
								onChange={ (title) => this.props.setAttributes( { title } ) }
							/>
							<RichText
								tagName='h5'
								placeholder={ __('Subtitle') }
								keepPlaceholderOnFocus={ true }
								value={ subtitle }
								isSelected={ false }
								onChange={ (subtitle) => this.props.setAttributes( { subtitle } ) }
							/>
							<RichText
								tagName='p'
								placeholder={ __('Write a brief bio...') }
								keepPlaceholderOnFocus={ true }
								value={ bio }
								onChange={ (bio) => this.props.setAttributes( { bio } ) }
							/>
							<div 
								className='organic-profile-social'
							>
							{ facebookURL && <a 
								className='social-link'
								href={ facebookURL }
								target='_blank'
								><i className='fab fa-facebook-f'/>
								</a>
							}
							{ twitterURL && <a 
								className='social-link'
								href={ twitterURL }
								target='_blank'
								><i className='fab fa-twitter'/>
								</a>
							}
							{ instagramURL && <a 
								className='social-link'
								href={ instagramURL }
								target='_blank'
								><i className='fab fa-instagram'/>
								</a>
							}
							{ linkedURL && <a 
								className='social-link'
								href={ linkedURL }
								target='_blank'
								><i className='fab fa-linkedin-in'/>
								</a>
							}
							{ emailAddress && <a 
								className='social-link'
								href={ 'mailto:' + emailAddress }
								target='_blank'
								><i className='fas fa-envelope'/>
								</a>
							}
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}


const BranzelProfileEdit = compose( [
	withColors( 'accentColor'),
] )( BranzelProfileBlock );

export default BranzelProfileEdit;