( function( editor, i18n, element ) {
	var el = element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var InnerBlocks = wp.editor.InnerBlocks;
	var RichText = wp.editor.RichText;

	registerBlockType( 'bootstrapblocks/tab', {
		title: i18n.__( 'Tab' ),
		parent: [ 'bootstrapblocks/tabs' ],
		description: i18n.__( 'A tab for the tabs block' ),
		icon: 'columns',
		category: 'common',
		attributes: {
			identifier: {
				type: "string",
			},
			isFirst: {
				type: "number",
			}
		},

		edit: function( props ) {
			var attributes = props.attributes;

			return [
				el( 'div', {
						className: 'tab-pane fade ', // + attributes.identifier + ((attributes.isFirst == 1 ) ? ' active show' : ''),
						'aria-labelledby': attributes.identifier + "-nav",
						role: "tabpanel",
						id: attributes.identifier , 
					},
					el( InnerBlocks, {
						templateLock: false,
					} ),
				)
			];
		},

		save: function( props ) {
			var attributes = props.attributes;
			
			return (
				el( 'div', {
						className: 'tab-pane fade ' + attributes.identifier + ((attributes.isFirst == 1 ) ? ' active show' : ''),
						'aria-labelledby': attributes.identifier + "-nav",
						role: "tabpanel",
						id: attributes.identifier , 
					},
					el( InnerBlocks.Content , {	} )
				)
			);
		},

	});
} )(
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
);