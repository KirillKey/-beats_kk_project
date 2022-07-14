(function(){

  
  const slider = $('.product__list').bxSlider({
    pager: false,
    controls: false
  });
  
  $(".product__arrow--prev").click (e => {
    e.preventDefault();
    slider.goToPrevSlide();
  })
  
  $(".product__arrow--next").click (e => {
    e.preventDefault();
    slider.goToNextSlide();
  })

})();