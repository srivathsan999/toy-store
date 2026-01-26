// Navbar Functionality
(function() {
  'use strict';

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuButton.querySelector('svg');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  }

  // Dropdown functionality
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('[data-dropdown-toggle]');
    const menu = dropdown.querySelector('[data-dropdown-menu]');

    if (button && menu) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            const otherMenu = other.querySelector('[data-dropdown-menu]');
            if (otherMenu) otherMenu.classList.add('hidden');
          }
        });
        menu.classList.toggle('hidden');
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('[data-dropdown-menu]');
        if (menu) menu.classList.add('hidden');
      });
    }
  });

  // Sticky navbar on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
      lastScroll = currentScroll;
    });
  }
})();

