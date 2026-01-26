// Cart UI Functionality (Static UI Only)
(function() {
  'use strict';

  const cartIcon = document.getElementById('cart-icon');
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
  let cartCount = 0;

  // Add to cart animation
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Increment cart count
      cartCount++;
      updateCartCount(cartCount);

      // Shake animation
      if (cartIcon) {
        cartIcon.classList.add('cart-shake');
        setTimeout(() => {
          cartIcon.classList.remove('cart-shake');
        }, 500);
      }

      // Show notification (optional)
      showCartNotification();
    });
  });

  // Update cart count display
  function updateCartCount(count) {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
      cartBadge.textContent = count;
      if (count > 0) {
        cartBadge.classList.remove('hidden');
      } else {
        cartBadge.classList.add('hidden');
      }
    }
  }

  // Show cart notification
  function showCartNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-[var(--accent-green)] text-white px-6 py-3 rounded-[14px] shadow-lg z-50 fade-in';
    notification.textContent = 'Item added to cart!';
    
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  // Initialize cart count from localStorage (if needed)
  function initCart() {
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      cartCount = parseInt(savedCount, 10);
      updateCartCount(cartCount);
    }
  }

  // Save cart count to localStorage
  function saveCartCount() {
    localStorage.setItem('cartCount', cartCount.toString());
  }

  // Update cart count and save
  const originalUpdateCartCount = updateCartCount;
  updateCartCount = function(count) {
    originalUpdateCartCount(count);
    saveCartCount();
  };

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }
})();

