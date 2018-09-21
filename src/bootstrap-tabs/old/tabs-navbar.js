( function( editor, components, i18n, element ) {
	var el = element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var RichText = wp.editor.RichText;

	registerBlockType( 'bootstrapblocks/tabs-navbar', { 
		title: i18n.__( 'Horizontal Pills2' ), 
		description: i18n.__( 'A custom block for displaying a horizontal tab menu.' ), 
		icon: 'columns', 
		category: 'layout',
		attributes: {
			numTabs: {
				type: "number",
				default:2
			},
			title1: {
				type: 'array',
				source: 'children',
				selector: '.tabs-tab-1-nav',
			},
			title2: {
				type: 'array',
				source: 'children',
				selector: '.tabs-tab-2-nav',
			},
			title3: {
				type: 'array',
				source: 'children',
				selector: '.tabs-tab-3-nav',
			},
			title4: {
				type: 'array',
				source: 'children',
				selector: '.tabs-tab-4-nav',
			},
			title5: {
				type: 'array',
				source: 'children',
				selector: '.tabs-tab-5-nav',
			},
			title6: {
				type: 'array',
				source: 'children',
				selector: '.tabs-tab-6-nav',
			},
		},
		supports: {
			align: [ 'wide', 'full' ],
		},

		edit: function( props ) {
			console.log(props);
			var attributes = props.attributes;
					
			return [
				el( 'nav', {
						className: 'nav nav-tabs',
						role: "tablist",
					},
					
					
					el( RichText, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-1-nav active",
						href: "#tabs-tab-1",
						'aria-controls': "tabs-tab-1",
						id: "tabs-tab-1-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						placeholder: "Title 1",
						value: attributes.title1,
						onChange: function( newTitle ) {
							props.setAttributes( { title1 : newTitle } );
						}
					} ),
					
					el( RichText, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-2-nav",
						href: "#tabs-tab-2",
						'aria-controls': "tabs-tab-2",
						id: "tabs-tab-2-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						placeholder: "Title 2",
						value: attributes.title2,
						onChange: function( newTitle ) {
							props.setAttributes( { title2 : newTitle } );
						}
					} ),
					
					el( RichText, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-3-nav" + ( ( attributes.numTabs < 3 ) ? " disabled" : ""),
						href: "#tabs-tab-3",
						'aria-controls': "tabs-tab-3",
						id: "tabs-tab-3-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						placeholder: "Title 3",
						value: attributes.title3,
						onChange: function( newTitle ) {
							props.setAttributes( { title3 : newTitle } );
						}
					} ),
					
					el( RichText, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-4-nav" + ( ( attributes.numTabs < 4 ) ? " disabled" : ""),
						href: "#tabs-tab-4",
						'aria-controls': "tabs-tab-4",
						id: "tabs-tab-4-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						placeholder: "Title 4",
						value: attributes.title4,
						onChange: function( newTitle ) {
							props.setAttributes( { title4 : newTitle } );
						}
					} ),
					
					el( RichText, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-5-nav" + ( ( attributes.numTabs < 5 ) ? " disabled" : ""),
						href: "#tabs-tab-5",
						'aria-controls': "tabs-tab-5",
						id: "tabs-tab-5-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						placeholder: "Title 5",
						value: attributes.title5,
						onChange: function( newTitle ) {
							props.setAttributes( { title5 : newTitle } );
						}
					} ),
					
					el( RichText, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-6-nav" + ( ( attributes.numTabs < 6 ) ? " disabled" : ""),
						href: "#tabs-tab-6",
						'aria-controls': "tabs-tab-6",
						id: "tabs-tab-6-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						placeholder: "Title 6",
						value: attributes.title6,
						onChange: function( newTitle ) {
							props.setAttributes( { title6 : newTitle } );
						}
					} ),
				),
			];
		},

		save: function( props ) {
			var attributes = props.attributes;
			
			return (
				el( 'nav', {
						className: "nav nav-tabs",
						role: "tablist",
					},
					el( RichText.Content, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-1-nav active",
						href: "#tabs-tab-1",
						'aria-controls': "tabs-tab-1",
						id: "tabs-tab-1-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						value: attributes.title1,
					} ),
					el( RichText.Content, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-2-nav",
						href: "#tabs-tab-2",
						'aria-controls': "tabs-tab-2",
						id: "tabs-tab-2-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						value: attributes.title2,
					} ),
					el( RichText.Content, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-3-nav" + ( ( attributes.numTabs < 3 ) ? " disabled" : ""),
						href: "#tabs-tab-3",
						'aria-controls': "tabs-tab-3",
						id: "tabs-tab-3-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						value: attributes.title3,
					} ),
					el( RichText.Content, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-4-nav" + ( ( attributes.numTabs < 4 ) ? " disabled" : ""),
						href: "#tabs-tab-4",
						'aria-controls': "tabs-tab-4",
						id: "tabs-tab-4-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						value: attributes.title4,
					} ),
					el( RichText.Content, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-5-nav" + ( ( attributes.numTabs < 5 ) ? " disabled" : ""),
						href: "#tabs-tab-5",
						'aria-controls': "tabs-tab-5",
						id: "tabs-tab-5-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						value: attributes.title5,
					} ),
					el( RichText.Content, {
						tagName: 'a',
						className: "nav-item nav-link tabs-tab-6-nav" + ( ( attributes.numTabs < 6 ) ? " disabled" : ""),
						href: "#tabs-tab-6",
						'aria-controls': "tabs-tab-6",
						id: "tabs-tab-6-nav" ,
						'data-toggle': "tab",
						role: "tab",
						
						value: attributes.title6,
					} ),
				)
			);
		},
	});
} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);