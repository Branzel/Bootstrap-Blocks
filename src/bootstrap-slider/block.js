/**
 * BLOCK: bootstrap-slider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

//  Import CSS.
import React from 'react';
import './style.scss';
import './editor.scss';

import { __ } from 'wp.i18n';
import { InspectorControls, InnerBlocks, BlockControls } from 'wp.editor';
import { PanelBody, TextControl, CheckboxControl, Toolbar } from 'wp.components';
import { Component, Fragment } from 'wp.element';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'branzel/block-bootstrap-slide' ];

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getSlidesTemplate = ( numSlides ) => {
	var col = [];
	
	for ( var i = 0; i < numSlides; i++ ) {
		col.push([ 'branzel/block-bootstrap-slide' ]);
	}
	return col;
};

const renderIndicators = (sliderID, numSlides ) => {
	var col = [];
	
	for ( var i = 0; i < numSlides; i++ ) {
		col.push(i);
	}
	
	return (
		<Fragment>
			<ol className="carousel-indicators">
			{ col.map( ( i ) => {
				return ( <li 
					data-target={ "#" + sliderID }
					data-slide-to={ i }
					className={ ( i == 0 ? "active" : '') }
				/> );
			})}
			</ol>
		</Fragment>
	);
};

const renderNavigation = ( id ) => {
	return (
		<Fragment>
			<a 
				className="carousel-control-prev"
				href={ "#" + id }
				role="button"
				data-slide="prev"
			>
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="sr-only">Previous</span>
			</a>
			<a 
				className="carousel-control-next"
				href={ "#" + id }
				role="button"
				data-slide="next"
			>
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="sr-only">Next</span>
			</a>
		</Fragment>
	);
};

registerBlockType( 'branzel/block-bootstrap-slider', {
	title: __( 'Image Slider' ), // Block title.
	icon: 'format-gallery',
	category: 'common',
	supports: {
		anchor: true,
		className: true
	},
	keywords: [
		__( 'image' ),
		__( 'gallery' ),
	],
	attributes: {
		numSlides: {
			type: 'number',
			default: 1
		},	
		slideTime: {
			type: 'string',
			default: 1500
		},
		enableNavigation: {
			type: 'number',
			default: 1
		},
		enableIndicators: {
			type: 'number',
			default: 1
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: class BootstrapSliderBlock extends Component {
		constructor(props) {
			super(...arguments);
			this.props = props;

			this.onSlideTimeChange = this.onSlideTimeChange.bind(this);
			this.onEnableNavigationChange = this.onEnableNavigationChange.bind(this);
			this.onEnableIndicatorsChange = this.onEnableIndicatorsChange.bind(this);
			this.onToolbarAction = this.onToolbarAction.bind(this);
		}

		onSlideTimeChange(slideTime) {
			this.props.setAttributes({slideTime});
		}
		
		onEnableNavigationChange(enableNavigation) {
			this.props.setAttributes({ enableNavigation });
		}
		
		onEnableIndicatorsChange(enableIndicators) {
			this.props.setAttributes({ enableIndicators });
		}
		
		onToolbarAction(action) {
			console.log (action);
		}

		render() {
			const { 
				className, 
				attributes: { 
					slideTime, 
					enableNavigation, 
					enableIndicators, 
					numSlides
				},
			} = this.props;

			return (
				<Fragment>
					<BlockControls>
						<Toolbar 
							controls={ [ 
								{
									icon: 'plus',
									title: __( 'Add Slide' ),
									slideAction: 'add',
									onClick: () => {
										const numSlides = this.props.attributes.numSlides + 1;
										this.props.setAttributes({ numSlides });
									}
								},
								{
									icon: 'minus',
									title: __( 'Remove Last Slide' ),
									slideAction: 'remove',
									onClick: () => {
										const numSlides = this.props.attributes.numSlides - 1;
										this.props.setAttributes({ numSlides });
									}
								},
							] }
						/>
					</BlockControls>
					<InspectorControls>
						<PanelBody title={ __( 'Slider Settings' ) } className="blocks-bootstrap-slider-settings">
							<TextControl
								label={ __( "Slide Time" ) }
								value={slideTime}
								help={ __( "Time to show each slide (ms). Or write 'false' if the slider should loop automatically." ) }
								onChange={ this.onSlideTimeChange }
							/>
							<CheckboxControl
								heading={ __( "Show Slider Navigation?" ) }
								label={ __( "Show" ) }
								help={ __( "Show the navigation arrows left and right?" ) }
								checked={ enableNavigation }
								onChange={ this.onEnableNavigationChange }
							/>
							<CheckboxControl
								heading={ __( "Show Hero Slider Indicators?" ) }
								label={ __( "Show" ) }
								help={ __( "The indicators are the small lines in the lower center." ) }
								checked={ enableIndicators }
								onChange={ this.onEnableIndicatorsChange }
							/>
						</PanelBody>
					</InspectorControls>
					<div className={ ( className ? " " + className : '' ) }>
						<InnerBlocks
							template={ getSlidesTemplate( numSlides ) }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS } />
					</div>
				</Fragment>
			);
		}
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save( { attributes, className } ) {
		const { 
			slideTime, 
			enableNavigation, 
			enableIndicators, 
			numSlides,
			anchor
		} = attributes;
		
		var sliderID = 'heroSlider';
		if ( anchor && anchor != '' ) {
			sliderID = anchor;
		}
		
		return (
			<Fragment>
				<div className={ classnames('owl-carousel') }>
					<InnerBlocks.Content />
				</div>
				<script>
					{ "jQuery( document ).ready(function() { jQuery('.owl-carousel').owlCarousel() });" }
				</script>
			</Fragment>
		);
	},
	
	// deprecated: [
		// {
			// save( { attributes, className } ) {
				// const { 
					// slideTime, 
					// enableNavigation, 
					// enableIndicators, 
					// numSlides,
					// anchor
				// } = attributes;
				
				// var sliderID = 'heroSlider';
				// if ( anchor && anchor != '' ) {
					// sliderID = anchor;
				// }
				
				// return (
					// <Fragment>
						// <div 
							// id={ sliderID }
							// className={"carousel slide" + ( className ? " " + className : '' ) } 
							// data-ride="carousel">
							// { ( ( enableIndicators && ( numSlides > 1 ) ) ? renderIndicators(sliderID, numSlides) : '' ) }
							// <div className="carousel-inner" role="listbox">
								// <InnerBlocks.Content />
							// </div>
							// { ( ( enableNavigation && ( numSlides > 1 ) ) ? renderNavigation(sliderID) : '' ) }
						// </div>
						// <script>
							// {"jQuery( document ).ready(function() { jQuery('#" + sliderID + " > .carousel-inner > .carousel-item').first().addClass('active'); jQuery('#" + sliderID + "').carousel({ interval:" + slideTime + "});});"}
						// </script>
					// </Fragment>
				// );
			// },
		// }
	// ]
} );
