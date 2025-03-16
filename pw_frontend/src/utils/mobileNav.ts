export function setupMobileNavigation() {
    const hamburgerBtn = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    if (hamburgerBtn && navbar) {
      let isOpen = false;
      
      hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        isOpen = !isOpen;
        
        if (isOpen) {
          hamburgerBtn.classList.add('hamburger--active');
          navbar.classList.add('navbar--open');
          body.style.overflow = 'hidden';
          hamburgerBtn.setAttribute('aria-expanded', 'true');
        } else {
          hamburgerBtn.classList.remove('hamburger--active');
          navbar.classList.remove('navbar--open');
          body.style.overflow = '';
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
      
      const navLinks = navbar.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          isOpen = false;
          hamburgerBtn.classList.remove('hamburger--active');
          navbar.classList.remove('navbar--open');
          body.style.overflow = '';
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }