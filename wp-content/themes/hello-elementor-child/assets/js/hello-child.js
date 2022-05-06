/**
 * Scrolling scripts by Benno Flory (2022)
 */
jQuery(document).ready(function ($) {

  // -------------------
  // SCROLLING behaviour
  // -------------------
  
  // Config
  var headerHeight = 85; // Fixed value, because measuring of dynamic header would fail
  var scrollModeOffset = 60; // After x pixels of scrolling down, the 'scrolling-down' class is set, e.g. for header layout
  
  /**
   * Removes leading and trailing slash
   * 
   * @param string str
   * @param char ch
   * @returns string
   */
  function trimSlashes(str) {
    return str.replace(/^\//, '').replace(/\/$/, '');
  }

  /**
   * Smooth scrolling to anchor, including offset (header and WP toolbar)
   * 
   * @param string anchorHash
   * @param integer duration - optional, default 600 (ms)
   */
  function scrollToAnchor(anchorHash, duration = 600) {
    var target = $(anchorHash);
    var offset = headerHeight + ($('#wpadminbar').length ? $('#wpadminbar').height() : 0);
    target = target.length ? target : $('[name=' + anchorHash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        // Scroll to element + offset
        scrollTop: target.offset().top - offset
      }, duration, function () {
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

  // Behaviour of links with hash: 
  // Remove other anchor link behaviour (elementor smooth scrolling) and add 
  // custom scrolling, except for elements with children. 
  $('.site-navigation .menu-item-has-children').hover(function(e) {
    $(this).addClass('elementor-active');
  }, 
  function(e) {
    $(this).removeClass('elementor-active');
  });
  $('a[href*=#]:not([href=#])').off('click').on('click', function (e) {
    let parent = $(this).parent();
    if (parent.hasClass('menu-item-has-children') && !parent.hasClass('elementor-active')) {
      // Open / close submenu
      e.preventDefault();
      parent.toggleClass('elementor-active');
      return false;
    }
    else {
      // Scroll to position and close mobile menu (if anchor on same page)
      if (trimSlashes(location.pathname) == trimSlashes(this.pathname) && location.hostname == this.hostname) {
        e.preventDefault();

        // Scrolling
        scrollToAnchor(this.hash);
        
        // Close all sub menus and mobile navigation
        $(this).closest('.menu').find('.elementor-active').removeClass('elementor-active');
        $('.site-navigation-toggle-holder').removeClass('elementor-active');
        $('.site-navigation-dropdown').attr('aria-hidden', "true");

        return false;
      }
    }
  });
  
  // Scroll on page load (and show content after hiding to prevent scroll jumping, see below)
  if (location.hash > '#') {
    $('html, body').show();
    scrollToAnchor(location.hash, 0);
  }
  
});

// Prevent scroll jumping on load
if (location.hash > '#') {
  jQuery('html, body').hide();
  history.scrollRestoration = "manual";
}
