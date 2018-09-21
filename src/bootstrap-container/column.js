/**
 * BLOCK: bootstrap-container
 *
 * A bootstrap container to allow the Bootstrap Grid System
 * Requires Bootstrap Theme Support
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const { Component, Fragment } = wp.element;
 
const { registerBlockType } = wp.blocks;

registerBlockType( 'branzel/block-bootstrap-column', {
	title: __( 'Bootstrap Column' ),
	icon: 'columns',
	category: 'common',
	parent: [ 'branzel/block-bootstrap-row' ],
	supports: {
		className: true
	},
	keywords: [
		__( 'Column' ),
		__( 'Bootstrap' ),
		__( 'Grid' ),
	],
	attributes: {
		columnWidth: {
			type: 'number',
			default: 6
		},
		mobileWidth: {
			type: 'number',
			default: 12
		},
	},
	
	edit: class extends Component {
		constructor(props) {
			super(...arguments);
			this.props = props;
		}

		render() {
			const { 
				className,
				attributes,
			} = this.props;
			const {
				mobileWidth = 12,
				columnWidth = 6
			} = attributes;

			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Responsive Settings' ) } className="blocks-bootstrap-column-settings">
							<SelectControl
								label="Desktop Size"
								value={ columnWidth }
								options={ [
									{ label: __('Full Screen'), value: 12 },
									{ label: __('1/2 Screen'), value: 6 },
									{ label: __('1/3 Screen'), value: 4 },
									{ label: __('1/4 Screen'), value: 3 },
									{ label: __('1/5 Screen'), value: 2 },
									{ label: __('1/6 Screen'), value: 1 },
								] }
								onChange={ ( columnWidth ) => this.props.setAttributes({ columnWidth }) }
							/>
							<SelectControl
								label="Mobile Size"
								value={ mobileWidth }
								options={ [
									{ label: __('Full Screen'), value: 12 },
									{ label: __('1/2 Screen'), value: 6 },
									{ label: __('1/3 Screen'), value: 4 },
									{ label: __('1/4 Screen'), value: 3 },
									{ label: __('1/5 Screen'), value: 2 },
									{ label: __('1/6 Screen'), value: 1 },
								] }
								onChange={ ( mobileWidth ) => this.props.setAttributes({ mobileWidth }) }
							/>
						</PanelBody>
					</InspectorControls>
					<div className={ "col-xs-" + mobileWidth + " col-sm-" + columnWidth + ( className ? " " + className : '' ) }>
						<InnerBlocks
							templateLock={ false } />
					</div>
				</Fragment>
			);
		}
	},
	
	save( { attributes, className } ) {	
		const {
			mobileWidth = 12,
			columnWidth = 6
		} = attributes;
			
		return (
			<div className={ "col-xs-" + mobileWidth + " col-sm-" + columnWidth + ( className ? " " + className : '' ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
	
	deprecated: [
        {
            attributes: {
				mobileWidth: {
					type: 'number',
					default: 12
				},
            },

            save( { attributes, className } ) {	
				const {
					mobileWidth
				} = attributes;
					
				return (
					<div className={ "col-xs-" + mobileWidth + " col" + ( className ? " " + className : '' ) }>
						<InnerBlocks.Content />
					</div>
				);
			},
        }
    ]
} );
