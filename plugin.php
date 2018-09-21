<?php
/**
 * Plugin Name: Branzel's Bootstrap Blocks
 * Description: Gutenberg Bootstrap Blocks
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Branzel
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BRANZEL_BLOCKS_ABSPATH', plugin_dir_path( __FILE__ ) );
define( 'BRANZEL_BLOCKS__FILE__', __FILE__ );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
