jQuery(document).ready(function ($) {

  // -------------------
  // SCROLLING behaviour
  // -------------------
   
  /**
   * Smooth scrolling to anchor, including offset (header and WP toolbar)
   * 
   * @param string anchorHash
   */
  function scrollToAnchor(anchorHash) {
    var headerHeight = 110; // Fixed, because measuring of dynamic header would fail
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
    if ($(window).scrollTop() > 50) {
      $('body').addClass('scrolling-down');
    } else {
      $('body').removeClass('scrolling-down');
    }
  });

  // Remove other anchor link behaviour (elementor smooth scrolling) and add custom scrolling
  $('a[href*=#]:not([href=#])').off('click').on('click', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      scrollToAnchor(this.hash);
      return false;
    }
  });
  // Scroll on page load
  if (location.hash > '#') {
    scrollToAnchor(location.hash);
  }
  
  // -------------------
  
});
