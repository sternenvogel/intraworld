<?php
/**
 * The template for displaying the header
 *
 * This is the template that displays all of the <head> section, opens the <body> tag and adds the site's header.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<?php $viewport_content = apply_filters( 'hello_elementor_viewport_content', 'width=device-width, initial-scale=1' ); ?>
	<meta name="viewport" content="<?php echo esc_attr( $viewport_content ); ?>">
	<link rel="profile" href="https://gmpg.org/xfn/11">
  <!-- Favicon stuff -->
  <link rel="apple-touch-icon" sizes="180x180" href="/wp-content/themes/hello-elementor-child/assets/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/wp-content/themes/hello-elementor-child/assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/wp-content/themes/hello-elementor-child/assets/favicon/favicon-16x16.png">
  <link rel="manifest" href="/wp-content/themes/hello-elementor-child/assets/favicon/site.webmanifest">
  <link rel="mask-icon" href="/wp-content/themes/hello-elementor-child/assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="/wp-content/themes/hello-elementor-child/assets/favicon/favicon.ico">
  <meta name="msapplication-TileColor" content="#2b5797">
  <meta name="msapplication-config" content="/wp-content/themes/hello-elementor-child/assets/favicon/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">
  <!-- End of Favicon -->
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php
hello_elementor_body_open();

if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'header' ) ) {
	if ( did_action( 'elementor/loaded' ) && hello_header_footer_experiment_active() ) {
		get_template_part( 'template-parts/dynamic-header' );
	} else {
		get_template_part( 'template-parts/header' );
	}
}
