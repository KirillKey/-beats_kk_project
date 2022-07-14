(function(){

  
  const openItem = item => {
    const teamItem = item.closest('.team__card');
    const teamDesc = teamItem.find('.team__desc');
    const teamContent = teamDesc.find('.team__content');
    const reqHeight = teamContent.height();
    
    teamItem.addClass('active-t');
    teamDesc.height(reqHeight);
    
    const teamAva = item.next('.team__avatar');
    const teamAvaHeight = teamAva.find('.team__avatar-img');
    const avaHeight = teamAvaHeight.height();
    teamAva.height(avaHeight);
  
  }
  
  const closeEveryItem = container => {
    const items = container.find('.team__desc');
    const itemItemAct = container.find('.team__card');
    
    itemItemAct.removeClass('active-t');
    items.height(0);
  }
  
  const closeEveryItemMobile = containerMobile => {
    const teamAva = containerMobile.find('.team__avatar');
    const teamAvaHeight = containerMobile.find('.team__avatar-img');
  
    teamAva.height(0);
  }
  
  const decorOpen = function (nameDecor) {
    if (nameDecor.find('.active-t')) {
      const activeDecor = nameDecor.find('.team__name-decor');
      activeDecor.css("transform",  "rotate(" + 0 + "deg)");
    }
  };
  const decorClose = function (nameDecor) {
    if (nameDecor.find('.active-t')) {
      const activeDecor = nameDecor.find('.team__name-decor');
      activeDecor.css("transform",  "rotate(" + 60 + "deg)");
    }
  };
  
  $('.team__name').click(e => {
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const containerMobile = $this.closest('.team--v-mobile');
    const teamItemAct = $this.closest('.team__card');
    
    
  
    if (teamItemAct.hasClass('active-t')) { 
      closeEveryItem(container);
      closeEveryItemMobile(containerMobile);
      decorClose($this);
    }
    else {
      closeEveryItem(container);
      closeEveryItemMobile(containerMobile);
      openItem($this);
      decorClose($this);
      decorOpen($this);
    }
  }
  )
  

})();