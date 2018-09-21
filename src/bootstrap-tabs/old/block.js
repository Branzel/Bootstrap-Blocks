const ALLOWED_BLOCKS = [ 'bootstrapblocks/tab', 'bootstrapblocks/tabs-navbar' ];

const getTabTemplate = (id, count) => {
	var col = [];
	
	col.push( [ 'bootstrapblocks/tabs-navbar', {
		'numTabs': count
	} ]);
	for ( var i = 1; i <= count; i++ ) {
		isFirstValue = 0;
		if ( i == 1 ) {
			isFirstValue = 1;
		}
		
		col.push([ 'bootstrapblocks/tab', {
			'identifier': id + '-tab-' + i,
			'isFirst': isFirstValue
		} ]);
	}

	return col;
};

( function( editor, components, i18n, element ) {
	var el = element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var RichText = wp.editor.RichText;
	var InspectorControls = wp.editor.InspectorControls;
	var InnerBlocks = wp.editor.InnerBlocks;

	registerBlockType( 'bootstrapblocks/tabs', { 
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
			var attributes = props.attributes;
					
			return [
				el( InspectorControls, { key: 'inspector' },
					el( components.PanelBody, {
							title: i18n.__( 'Horizontal Tabs Settings' ),
							className: 'block-settings',
							initialOpen: true,
						},
						el ( components.RangeControl, {
							label: i18n.__( 'Columns' ),
							value: attributes.numTabs,
							onChange: function( newNumTabs ) {
								props.setAttributes( { numTabs: newNumTabs } );
							},
							min: 2,
							max: 6,
						} )
					),
				),
				el( 'div', {
						className: "tab-content",
					},
					el( InnerBlocks, { 
						template: getTabTemplate('tabs', attributes.numTabs),
						templateLock: "all",
						allowedBlocks: ALLOWED_BLOCKS
					} ),
				)
			];
		},

		save: function( props ) {
			var attributes = props.attributes;
			
			return (
				el( 'div', {
						className: "tab-content",
					},
					el( InnerBlocks.Content , {	} )
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