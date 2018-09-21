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

/**
 * Internal dependencies
 */
import './tab.js';
import './style.scss';
import './editor.scss';
 
const { registerBlockType } = wp.blocks;

const ALLOWED_BLOCKS = [ 'branzel/block-bootstrap-tab' ];

registerBlockType( 'branzel/block-bootstrap-tabs', {
	title: __( 'Bootstrap Tabs' ),
	icon: <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><g><path d="M21 4H3L2 5v14l1 1h18l1-1V5l-1-1zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z" /></g></svg>,
	category: 'layout',
	supports: {
		className: true
	},
	keywords: [
		__( 'Tab' ),
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
				className,
				attributes
			} = this.props;

			return (
				<div className={ "container" + ( className ? " " + className : '' ) }>
					<InnerBlocks
						template={ [ [ 'branzel/block-bootstrap-tab' ] ] }
						templateLock="false"
						allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			);
		}
	},
	
	save( { attributes, className } ) {
		const tabList = <InnerBlocks.Content />;
		
		console.log(tabList);
		console.log(tabList.props.BlockContent);
		
		return (
			<div className={ "container" + ( className ? " " + className : '' ) }>
				{ tabList } 
			</div>
		);
	},
} );
