<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


function branzel_register_dynamicblocks() {
	register_block_type( 'branzel/block-embedpdf', array(
		'render_callback' => 'render_embedpdf',
	) );
}
add_action( 'init', 'branzel_register_dynamicblocks' );

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function branzels_blocks_block_assets() {
	// Styles.
	wp_enqueue_style(
		'branzel-bootstrapblocks-frontend-style', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);
	
	wp_enqueue_script ( 'owl-carousel-script',  plugins_url( 'includes/js/owl.carousel.min.js', BRANZEL_BLOCKS__FILE__ ), array( 'jquery' ), '1.0.0', true );
	
	wp_enqueue_script ( 'owl-carousel-script',  plugins_url( 'includes/js/branzel.blocks.init.js', BRANZEL_BLOCKS__FILE__ ), array( 'jquery' ), '1.0.0', true );
} // End function branzels_blocks_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'branzels_blocks_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function branzels_blocks_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'branzel-bootstrapblocks-block-script', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'branzel-bootstrapblocks-block-editor--style', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function branzels_blocks_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'branzels_blocks_editor_assets' );

function render_embedpdf($attributes, $content) {
	if( !isset($attributes['href']) || !isset($attributes['fileName']) ) {
		return '';
	}
	
	wp_enqueue_script ( 'pdfjs-script',  plugins_url( 'includes/js/pdf.min.js', BRANZEL_BLOCKS__FILE__ ), '', '1.0.0', true );
	wp_enqueue_script ( 'pdfjs-worker-script',  plugins_url( 'includes/js/pdf.worker.min.js', BRANZEL_BLOCKS__FILE__ ), '', '1.0.0', true );
	wp_enqueue_script ( 'pdfjs-init-script',  plugins_url( 'includes/js/loadReader.js', BRANZEL_BLOCKS__FILE__ ), array( 'pdfjs-script' ), '1.0.0', true );
	wp_add_inline_script('pdfjs-init-script', "var url = '" . $attributes['href'] . "';canvas = document.getElementById('canvas-" . $attributes['fileName'] . "');var pageElement = document.getElementById('page-" . $attributes['fileName'] . "');var containerElement = jQuery('#page-" . $attributes['fileName'] . "');var navElement = jQuery('#navPDF-" . $attributes['fileName'] . "');", 'before');
	
	
	$output = '
	<nav id="navPDF-' . $attributes['fileName'] . '" class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">' . $attributes['fileName'] . '</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarPDF-' . $attributes['fileName'] . '" aria-controls="navbarPDF-' . $attributes['fileName'] . '" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarPDF-' . $attributes['fileName'] . '">
    <ul class="navbar-nav mr-auto">
		<span class="navbar-text">
			Page: <span id="page_num"></span> / <span id="page_count"></span>
		</span>
		<li class="nav-item">
			<a href="#" class="nav-link prev"><i class="fas fa-chevron-left"></i></a>
		</li>
		<li class="nav-item">
			<a href="#" class="nav-link next"><i class="fas fa-chevron-right"></i></a>
		</li>
		<li class="nav-item">
			<a href="#" class="nav-link zoomin"><i class="fas fa-search-plus"></i></a>
		</li>
		<li class="nav-item">
			<a href="#" class="nav-link zoomout"><i class="fas fa-search-minus"></i></a>
		</li>
		<span class="navbar-text">
			Zoom: <span id="zoom_level"></span> %</span>
		</span>
    </ul>
  </div>
</nav>
	<div id="page-' . $attributes['fileName'] . '" class="wp-block-branzel-embedpdf">
<canvas id="canvas-' . $attributes['fileName'] . '"></canvas></div>';
	
	
	return $output;
}