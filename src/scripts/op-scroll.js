(function(){
  
  
  const section = $("section");
  section.first().addClass("active-sec");
  
  const display = $(".main-content");
  const sideMenu = $(".fixed-menu");
  const menuItem = sideMenu.find(".fixed-menu__item");

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  
  let inScroll = false;
  
  const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;
    if(isNaN(position)){
      console.error("передано не верное значение в countSectionPosition");
      return 0;
    }
    return position;
  };
  
  
  const changeMenuThemeSection = sectionEq => {
    const currenSection = section.eq(sectionEq);
    const menuTheme = currenSection.attr("data-sidemenu-theme");
    const activeClassFix = "fixed-menu--white";
  
    if(menuTheme == "white"){
      sideMenu.addClass(activeClassFix);
  
    } else {
      sideMenu.removeClass(activeClassFix);
    }
  };
  
  const resetActiveClassForItem = (item, itemEq, activeClass) => {
    item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
  };
  
  const performTransition = sectionEq => {
  
    display.css({transition: ""});
    const trasitionOver = 1000;
    const mouseInertOver = 300;
  
    if(inScroll) return;
  
    inScroll = true;
  
    const position = countSectionPosition(sectionEq);
    changeMenuThemeSection(sectionEq);
    
    display.css({
      transform: `translateY(${position}%)`
    });
    
    resetActiveClassForItem(section, sectionEq, "active-sec")
    
    
    setTimeout(() => {
      inScroll = false;
  
      resetActiveClassForItem(menuItem, sectionEq,"fixed-menu__item--active");
    }, trasitionOver + mouseInertOver);
  };
  
  const ViewportScroller = () => {
    const activeSection = section.filter(".active-sec");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
      next(){
        if(nextSection.length){
            performTransition(nextSection.index());
    }
      },
      prev(){
        if(prevSection.length){
            performTransition(prevSection.index());
    }
      },
    }
    
  };
  
  
  $(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller =  ViewportScroller();
  
    if(deltaY > 0){
      scroller.next()
    }
    
    if(deltaY < 0){
      scroller.prev()
    }
  });
  
  $(window).on("keydown", e =>{
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInput = tagName == "input" ||  tagName == "textarea"
    const scroller =  ViewportScroller();
    
    if(userTypingInInput) return;
  
      switch (e.keyCode){
        case 38: 
        scroller.next()
        break;
    
        case 40: 
        scroller.prev()
        break;
      }
  });
  

  $(".wrapper").on('touchmove', e  => e.preventDefault());

  $("[data-scroll-to]").click(e => {
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);
    
    performTransition(reqSection.index());
  
    const activeHumburger = $(".active-hamburger");
    if (activeHumburger.hasClass('active-hamburger')){
      $(".main-content").css({transition: "transform"});
      $(".hamburger-menu").css({display: 'none'}).removeClass("active-hamburger");
    }
  });
  
  if(isMobile){
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe( {
      swipe:function(event, direction) {
        const scroller =  ViewportScroller();
        let scrollDirection  = "";
    
        if(direction == "up") scrollDirection = "next";
        if(direction == "down") scrollDirection = "prev";
    
        scroller[scrollDirection](); 
        console.log(scroller);
      }
  });
  }



})();