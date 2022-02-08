jQuery(document).ready(function ($) {

  // -------------------
  // SCROLLING behaviour
  // -------------------
  
  // Config
  var headerHeight = 110; // Fixed value, because measuring of dynamic header would fail
  var scrollModeOffset = 60; // After x pixels of scrolling down, the 'scrolling-down' class is set, e.g. for header layout
   
  /**
   * Smooth scrolling to anchor, including offset (header and WP toolbar)
   * 
   * @param string anchorHash
   */
  function scrollToAnchor(anchorHash) {
    var target = $(anchorHash);
    var offset = headerHeight + ($('#wpadminbar').length ? $('#wpadminbar').height() : 0);
    target = target.length ? target : $('[name=' + anchorHash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        // Scroll to element + offset
        scrollTop: target.offset().top - offset
      }, 600, function () {
        // Append hash to url
        history.pushState({}, "", anchorHash)
      });
    }
  }

  // Add scrolling class when scrolling down (e.g. to style top header)
  $(window).scroll(function () {
    if ($(window).scrollTop() > scrollModeOffset) {
      $('body').addClass('scrolling-down');
    } else {
      $('body').removeClass('scrolling-down');
    }
  });

  // Remove other anchor link behaviour (elementor smooth scrolling) and add 
  // custom scrolling, except for elements with children. 
  $('a[href*=#]:not([href=#])').off('click').on('click', function (e) {
    let parent = $(this).parent();
    console.log($(this));
    console.log(parent);
    if (parent.hasClass('menu-item-has-children')) {
      // Open / close submenu
      e.preventDefault();
      parent.toggleClass('elementor-active');
      return false;
    }
    else {
      // Scroll to position and close mobile menu
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        e.preventDefault();

        // Scrolling
        scrollToAnchor(this.hash);
        // Close all sub menus
        $(this).closest('.menu').find('.elementor-active').removeClass('elementor-active');
        // Close mobile navigation
        $('.site-navigation-toggle-holder').removeClass('elementor-active');
        $('.site-navigation-dropdown').attr('aria-hidden', "true");

        return false;
      }
    }
  });
  
  // Scroll on page load
  if (location.hash > '#') {
    scrollToAnchor(location.hash);
  }
  
});
