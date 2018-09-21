/**
 * BLOCK: profile
 *
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n; // Import __() from wp.i18n

const { registerBlockType } = wp.blocks;
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';

const blockAttributes = {	
	id: {
		type: 'number',
	},
	href: {
		type: 'string',
	},
	fileName: {
		type: 'string',
	},
};

registerBlockType( 'branzel/block-embedpdf', {
	title: __( 'Embed PDF' ),
	description: __( 'A custom block for embedding a pdf.' ),
	icon: 'menu',
	category: 'embed',
	keywords: [ __( 'document' ), __( 'pdf' ) ],
	attributes: blockAttributes,

	edit,

	save: function() {
		return null // Server side rendering
	},
});