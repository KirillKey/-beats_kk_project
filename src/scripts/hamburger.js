(function(){
  
  
  const hamburger = document.querySelector('.hamburger');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const hamburgerMenuClose = document.querySelector('.hamburger-menu__close');
  
  
  hamburger.addEventListener('click', function(event){
    event.preventDefault();
    
    hamburgerMenu.style.display = 'flex';
  
    hamburgerMenu.classList.add('active-hamburger');
    const active = hamburgerMenu;
  });
  
  hamburgerMenuClose.addEventListener('click', function(event){
    event.preventDefault();
    
    hamburgerMenu.style.display = 'none';
    const active = hamburgerMenu.classList.remove('active-hamburger');
  });


})();  
