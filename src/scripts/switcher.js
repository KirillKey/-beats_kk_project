(function(){
  
  const findBlockAlias = (alias) => {
    return $('.feedbacks__item').filter((ndx, item) => {
      return $(item).attr('data-lk-with') == alias;
    });
  };
  
  
  
  $('.feedback-switcher__link').click((e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const curItem = $this.closest('.feedback-switcher__item');
  
    const itemShow = findBlockAlias(target);
    curItem.addClass('active').siblings().removeClass('active');
    itemShow.addClass('active').siblings().removeClass('active');
  
  });

})();