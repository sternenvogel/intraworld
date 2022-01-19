<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Enqueue style sheets
function hello_elementor_child_enqueue_styles() {
  wp_enqueue_style(
    'hello-elementor-child-style', 
    get_stylesheet_directory_uri() . '/style.css', 
    // Dependencies
    array( 'hello-elementor', 'hello-elementor-theme-style', 'elementor-frontend' ));
}
// Load in frontend
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_styles' );
// Load in backend
add_action( 'admin_enqueue_scripts', 'hello_elementor_child_enqueue_styles' );

// Enqueue javascripts in /assets/js/
function hello_elementor_child_enqueue_scripts(){
  wp_enqueue_script(
    'hello-elementor-child-script', 
    get_stylesheet_directory_uri() . '/assets/js/hello-child.js', 
    // Dependencies
    array( 'jquery' ));
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts' );
