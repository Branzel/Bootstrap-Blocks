/**
 * BLOCK: core/columns
 *
 * Updating the existing columns block
 */

const { addFilter } = wp.hooks;

function addBootstrapColumnsClass( blockElement, blockType, blockAttributes ) {
    if ( blockType['name'] === 'core/columns' ) {
        return (
			<div className={ "container" + ( blockAttributes.className ? " " +  blockAttributes.className : "" ) }>
				<div className="row">
					{ blockElement.props.children }
				</div>
			</div>
		);
    } else {
		return blockElement;
    }
}


function addBootstrapColumnClass( blockElement, blockType, blockAttributes ) {
	if ( blockType['name'] === 'core/column' ) {
        return (
			<div className={ "col-xs-12 col " + ( blockAttributes.className ? " " +  blockAttributes.className : "" ) }>
				{ blockElement.props.children }
			</div>
		);
    } else {
		return blockElement;
	}
}

addFilter(
    'blocks.getSaveElement',
    'core/columns',
    addBootstrapColumnsClass
);

addFilter(
    'blocks.getSaveElement',
    'core/column',
    addBootstrapColumnClass
);