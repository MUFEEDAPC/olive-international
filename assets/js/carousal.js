$(document).ready(function() {
    var carousel = $('.carousel');
    var card = $('.card');
    var cardWidth = card.outerWidth(true);
    var interval;
  
    function startCarousel() {
      interval = setInterval(function() {
        carousel.animate({scrollLeft: '-=' + cardWidth}, 1000, function() {
          carousel.find('.card:last').prependTo(carousel);
          carousel.scrollLeft(0);
        });
      }, 4000);
    }
  
    function stopCarousel() {
      clearInterval(interval);
    }
  
    carousel.on({
      mouseenter: stopCarousel,
      mouseleave: startCarousel
    });
  
    startCarousel();
  });
  