// Add this to your main.js file or create a new mobile-menu.js file

document.addEventListener('DOMContentLoaded', function() {
  // Improved mobile navigation setup
  function setupMobileNavigation() {
    // Get elements
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) {
      console.warn('Mobile navigation elements not found');
      return;
    }
    
    console.log('Setting up mobile navigation');
    
    // Ensure the toggle is visible when it should be
    if (window.innerWidth <= 768) {
      menuToggle.style.display = 'flex';
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent bubbling to document click handler
      mainNav.classList.toggle('open');
      console.log('Menu toggled:', mainNav.classList.contains('open'));
      
      // Optional: Change toggle icon when menu is open
      const toggleIcon = menuToggle.querySelector('svg');
      if (toggleIcon) {
        if (mainNav.classList.contains('open')) {
          toggleIcon.innerHTML = '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>';
        } else {
          toggleIcon.innerHTML = '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>';
        }
      }
    });
    
    // Close menu when clicking elsewhere
    document.addEventListener('click', function(event) {
      // If click is outside menu and toggle, close menu
      if (mainNav.classList.contains('open') && 
          !menuToggle.contains(event.target) && 
          !mainNav.contains(event.target)) {
        mainNav.classList.remove('open');
        
        // Reset toggle icon if needed
        const toggleIcon = menuToggle.querySelector('svg');
        if (toggleIcon) {
          toggleIcon.innerHTML = '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>';
        }
      }
    });
    
    // Close menu when a nav button is clicked
    document.querySelectorAll('.main-nav .nav-button').forEach(button => {
      button.addEventListener('click', function() {
        mainNav.classList.remove('open');
        
        // Reset toggle icon if needed
        const toggleIcon = menuToggle.querySelector('svg');
        if (toggleIcon) {
          toggleIcon.innerHTML = '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>';
        }
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      // Show/hide toggle based on window width
      if (window.innerWidth <= 768) {
        menuToggle.style.display = 'flex';
      } else {
        menuToggle.style.display = 'none';
        mainNav.classList.remove('open');
      }
    });
  }
  
  // Initialize mobile navigation
  setupMobileNavigation();
});
