/**
 * BLOCK: core/table
 *
 * Updating the existing table block
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { cloneElement } = wp.element;
const { addFilter } = wp.hooks;

function addBootstrapTableClass( blockElement, blockType, blockAttributes ) {
    if ( blockType['name'] !== 'core/table' ) {
        return blockElement;
    }
	
	const newElement = cloneElement ( blockElement, {
		className: "table table-striped table-bordered " + ( blockAttributes.className ? blockAttributes.className : '')
	} );
	
	return (
		<div class="table-responsive">
			{ newElement }
		</div>);
}

addFilter(
    'blocks.getSaveElement',
    'core/table',
    addBootstrapTableClass
);