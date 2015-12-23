// NAVIGATION FUNCTIONALITY

(function() {
'use strict';
  // Some localized variables/properties in an 'infuse' object
  var infuse = {

    // Some properties
    navHidden: false,
    sidebarHidden: true,
    sidebarElems: ['#global_sidebar', '#main_body', '.util-bar-nav-list'],
    padTop: $('#util_bar').height(),
    hdrGlobal: $('#hdr_global'),
    hdrScroll: $('#hdr_scroll'),
    globalSidebar: $('#global_sidebar'),
    moreBtn: $('#more_btn'),

    // Some methods
    hideGlobalHeader: function() {
      // Show the global header and hide the scrolling minimized header
      this.hdrGlobal.addClass('hide-nav-bar-primary');
      this.hdrScroll.removeClass('hdr-scroll-invisible');
    },

    showGlobalHeader: function(pos) {

      if (pos === undefined) {
        this.hdrGlobal.removeClass('hide-nav-bar-primary').css({
          'position':'fixed',
          'padding-top':'0px'
        });
        this.hdrScroll.addClass('hdr-scroll-invisible');
      } else if  (pos == 'top') {
        this.hdrGlobal.removeClass('hide-nav-bar-primary').css({
          'position':'absolute',
          'padding-top': infuse.padTop +'px'
        });
        this.hdrScroll.addClass('hdr-scroll-invisible');
      }
    },

  };

  // This function includes a scroll handler that passes the two 'callback' parameters
  // based off scrolling down and scrolling up
  var scrollUpOrDown = function(scrollDown, scrollUp) {

    // Grab original position
    var position = $(window).scrollTop();

    // The scroll handler on window
    $(window).scroll(function() {
      // Get new scroll position
      var scroll = $(window).scrollTop();
      if (scroll > position) {
        scrollDown();
      } else {
        scrollUp();
      }

      // Sync new Scroll position back to scroll
      position = scroll;

    });
  };

  // function to use when scrolling down
  function scroll_down() {
    if (infuse.navHidden === false && $(window).scrollTop() >= 100) {
      // hide the top global header
      infuse.hideGlobalHeader();
      // and then state that it is hidden
      infuse.navHidden = true;
    }
    if (!infuse.sidebarHidden && $(window).scrollTop() > 30) {
      // show the global header
      infuse.showGlobalHeader();
      // change the state of boolean
      infuse.navHidden = false;
      // Remove the sidebar's top padding
      removeSidebarPadTop();
    }
  }

  // function to use when scrolling up
  function scroll_up() {

    if (infuse.navHidden) {
      if ($(window).scrollTop() >= 100) {
        infuse.showGlobalHeader();
        removeSidebarPadTop();
      }
      infuse.navHidden = false; // nav is now false
    }

    if (infuse.navHidden === false && $(window).scrollTop() <= 50) {
      infuse.showGlobalHeader('top');
      addSidebarPadTop();
    }

  } // end of scroll_up()


  // HELPER FUNCTIONS
  var showSidebar = function(elems) {
    $(elems.join(', ')).addClass('sidebar-active');
    hideMoreBtn();
    if (infuse.navHidden) {
      infuse.showGlobalHeader();
      if ($(window).scrollTop() > 30) {
        removeSidebarPadTop();
      }
    }

    infuse.sidebarHidden = false;
  };

  var closeSidebar = function(elems) {
    $(elems.join(', ')).removeClass('sidebar-active');
    showMoreBtn();
    infuse.sidebarHidden = true;
  };

  var removeSidebarPadTop = function() {
    infuse.globalSidebar.css('padding-top','0px');
  };

  var addSidebarPadTop = function() {
    infuse.globalSidebar.css('padding-top', infuse.padTop+'px');
  };

  var showMoreBtn = function() {
    infuse.moreBtn.removeClass('more-btn-hidden');
  };

  var hideMoreBtn = function() {
    infuse.moreBtn.addClass('more-btn-hidden');
  };


  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var masterResizeFn = debounce(function() {
    $(".sidebar-nav-wrapper > nav").height($(".sidebar-nav-wrapper").height());
  }, 250);


  $(window).on('resize', masterResizeFn).resize();

  // SIDEBAR CLICK HANDLERS

  $('#more_btn, #scroll_more_btn').on('click', function(e) {
    e.preventDefault();
    showSidebar(infuse.sidebarElems);
  });

  $('#tri_close').on('click', function(e) {
    closeSidebar(infuse.sidebarElems);
    showMoreBtn();
  });

  // Instantiate the scroll handler
  scrollUpOrDown(scroll_down, scroll_up);

})();


// @TODO:
// 1. dynamically change the will change style property on all respective elements on hover of more_btn(s)
// 2. Refactor object
// 3. Include mobile functionality
//


// Rough generic example
// Get the element that is going to be animated on click, for example
// var el = document.getElementById('element');

// // Set will-change when the element is hovered
// el.addEventListener('mouseenter', hintBrowser);
// el.addEventListener('animationEnd', removeHint);

// function hintBrowser() {
//   // The optimizable properties that are going to change
//   // in the animation's keyframes block
//   this.style.willChange = 'transform, opacity';
// }

// function removeHint() {
//   this.style.willChange = 'auto';
// }