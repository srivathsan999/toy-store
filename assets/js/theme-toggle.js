// Theme Toggle Functionality
(function() {
  'use strict';

  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Get saved theme or default to light
  const getTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Set theme
  const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  };

  // Update theme icon
  const updateThemeIcon = (theme) => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('svg');
    if (!icon) return;

    if (theme === 'dark') {
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      `;
    } else {
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      `;
    }
  };

  // Initialize theme immediately (before DOMContentLoaded to prevent flash)
  const initTheme = () => {
    const theme = getTheme();
    setTheme(theme);
  };

  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const currentTheme = html.getAttribute('data-theme') || getTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Initialize immediately
  initTheme();

  // Also initialize on load as backup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();

