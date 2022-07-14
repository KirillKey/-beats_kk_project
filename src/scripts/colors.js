(function (){


  const windowWidth = $(window).width();

  const openColor = item => {
    const colorList = item.closest('.color__list');
    const colorItem = item.closest('.color__item');
    const colorDesc = colorItem.find('.color__desc');
    const colorContent = colorDesc.find('.color__content');
    const necWidth = colorContent.width();
    
    colorItem.addClass('active-color');
    colorDesc.width(necWidth);
  
    if(windowWidth <= 480){
      colorItem.css({
        "position": "relative",
        "z-index": "1",
        "right": "0"
      })
    };
  
  };
  
  const closeColor = colorList => {
    const colorItem = colorList.find('.color__item');
    const colorDesc = colorList.find('.color__desc');
  
    colorItem.removeClass("active-color")
    colorDesc.width(0);
    
      if(windowWidth <= 480){
        colorItem.css({
          "position": "absolute",
          "z-index": "",
          "right": ""
        })
      };
  
  };
  
  const title = $('.section__title');
  const titleNone = () => {
      title.css({"display": "none"});
  };
  const titleOn = () => {
      title.css({"display": "block"});
  };
  
  
  $('.color__title').click(e => {
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    const colorList = $this.closest('.color__list');
    const colorItemAct = $this.closest('.color__item');
    const windowWidth = $(window).width();
  
    if(colorItemAct.hasClass('active-color')){
      closeColor(colorList);
  
      if(windowWidth <= 768){
        titleOn();
      } else {titleOn();}
      
    }
  
    else {
      closeColor(colorList);
      openColor($this);
  
      if(windowWidth <= 768){
        titleNone();
      } else {titleOn();}
  
    }
     
  });
  
  
  
  // const colorItem = $('.color__item');
  // if(windowWidth > 480){
  //   colorItem.css({
  //     "position": "static",
  //     "z-index": "",
  //     "right": ""
  //   });
  // } else {
  //   colorItem.css({
  //     "position": "absolute"})
  // };

  
})();