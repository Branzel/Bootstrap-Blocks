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
const { Component, Fragment } = wp.element;
 
const { registerBlockType } = wp.blocks;

registerBlockType( 'branzel/block-bootstrap-tab', {
	title: __( 'Bootstrap Tab' ),
	description: __( 'A tab for the tabs block' ),
	icon: 'columns',
	category: 'common',
	parent: [ 'branzel/block-bootstrap-tabs' ],
	supports: {
		className: true
	},
	keywords: [
		__( 'Tab' ),
		__( 'Bootstrap' ),
		__( 'Grid' ),
	],
	attributes: {
	},
	
	edit: class extends Component {
		constructor(props) {
			super(...arguments);
			this.props = props;
		}

		render() {
			const { 
				className,
				attributes
			} = this.props;

			return (
				<Fragment>
					<div className={ ( className ? " " + className : '' ) }>
						<InnerBlocks
							templateLock="false" />
					</div>
				</Fragment>
			);
		}
	},
	
	save( { attributes, className } ) {
		return (
			<div className={ ( className ? " " + className : '' ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
