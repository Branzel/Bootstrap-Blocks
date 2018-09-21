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
const { InnerBlocks } = wp.editor;
const { Component } = wp.element;
 
const { registerBlockType } = wp.blocks;

const ALLOWED_BLOCKS = [ 'branzel/block-bootstrap-column', 'branzel/block-profile' ];

registerBlockType( 'branzel/block-bootstrap-row', {
	title: __( 'Bootstrap Row' ),
	icon: 'columns',
	category: 'common',
	parent: [ 'branzel/block-bootstrap-container' ],
	supports: {
		className: true
	},
	keywords: [
		__( 'Row' ),
		__( 'Bootstrap' ),
		__( 'Grid' ),
	],
	attributes: {
		test: {
			type: 'string',
		},
	},
	
	edit: class extends Component {
		constructor(props) {
			super(...arguments);
			this.props = props;
		}

		render() {
			const { 
				className
			} = this.props;

			return (
				<div className={ "row" + ( className ? " " + className : '' ) }>
					<InnerBlocks
						templateLock={ false }
						allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			);
		}
	},
	
	save( { className } ) {
		return (
			<div className={ "row" + ( className ? " " + className : '' ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
	
	
	deprecated: [
        {
            attributes: {
				test: {
					type: 'string',
				},
            },

            save( { className } ) {
				return (
					<div className={ "row" + ( className ? " " + className : '' ) }>
						<InnerBlocks.Content />
					</div>
				);
			},
        },
        {
            attributes: {
				test: {
					type: 'string',
				},
            },

            save( { className } ) {
				return (
					<div className={ "container" + ( className ? " " + className : '' ) }>
						<InnerBlocks.Content />
					</div>
				);
			},
        }
    ]
} );
