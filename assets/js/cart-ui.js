// Cart UI Functionality
(function () {
  'use strict';

  // --- Constants and State ---
  const cartIcon = document.getElementById('cart-icon');
  const cartBadge = document.getElementById('cart-badge');
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');

  // Cart items state - load from localStorage
  let cart = JSON.parse(localStorage.getItem('playnest_cart') || '[]');

  // --- Core Cart Functions ---

  function saveCart() {
    localStorage.setItem('playnest_cart', JSON.stringify(cart));
    updateGlobalBadge();
    renderAll();
  }

  function addItem(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    showCartNotification(`${product.name} added to cart!`);
    if (cartIcon) {
      cartIcon.classList.add('cart-shake');
      setTimeout(() => cartIcon.classList.remove('cart-shake'), 500);
    }
    saveCart();
  }

  function updateQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty < 1) {
        removeItem(id);
      } else {
        saveCart();
      }
    }
  }

  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
  }

  function updateGlobalBadge() {
    if (cartBadge) {
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      cartBadge.textContent = count;
      if (count > 0) {
        cartBadge.classList.remove('hidden');
      } else {
        cartBadge.classList.add('hidden');
      }
      localStorage.setItem('cartCount', count); // Keep sync with any old logic
    }
  }

  function showCartNotification(msg) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-[var(--accent-green)] text-white px-6 py-3 rounded-[14px] shadow-lg z-50 fade-in';
    notification.textContent = msg;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  }

  // --- UI Rendering ---

  function renderAll() {
    renderCartPage();
    renderShopPageCards();
  }

  // Render logic for cart.html
  function renderCartPage() {
    const cartItemsBody = document.getElementById('cart-items-body');
    if (!cartItemsBody) return;

    if (cart.length === 0) {
      cartItemsBody.innerHTML = '<tr><td colspan="5" class="py-12 text-center text-[var(--text-secondary)] italic">Your cart is empty</td></tr>';
      updateCartTotals(0);
      const checkoutBtn = document.getElementById('checkout-btn');
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.disabled = false;

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      html += `
        <tr data-product-id="${item.id}" class="cart-item">
            <td class="py-4">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 rounded-lg bg-[var(--bg-primary)] overflow-hidden flex-shrink-0">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <span class="font-medium text-[var(--text-primary)]">${item.name}</span>
                </div>
            </td>
            <td class="py-4 text-[var(--text-secondary)]">$${item.price.toFixed(2)}</td>
            <td class="py-4">
                <div class="flex items-center space-x-2">
                    <button class="qty-btn-minus w-8 h-8 rounded-lg border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]" data-id="${item.id}">-</button>
                    <input type="text" value="${item.qty}" class="w-12 text-center bg-transparent text-[var(--text-primary)]" readonly>
                    <button class="qty-btn-plus w-8 h-8 rounded-lg border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]" data-id="${item.id}">+</button>
                </div>
            </td>
            <td class="py-4 font-medium text-[var(--accent-orange)]">$${itemTotal.toFixed(2)}</td>
            <td class="py-4 text-right">
                <button class="remove-btn text-red-500 hover:text-red-700" data-id="${item.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
      `;
    });

    cartItemsBody.innerHTML = html;
    updateCartTotals(subtotal);

    // Add event listeners to newly rendered elements (Cart Page)
    cartItemsBody.querySelectorAll('.qty-btn-plus').forEach(btn => {
      btn.onclick = () => updateQty(btn.dataset.id, 1);
    });
    cartItemsBody.querySelectorAll('.qty-btn-minus').forEach(btn => {
      btn.onclick = () => updateQty(btn.dataset.id, -1);
    });
    cartItemsBody.querySelectorAll('.remove-btn').forEach(btn => {
      btn.onclick = () => removeItem(btn.dataset.id);
    });
  }

  function updateCartTotals(subtotal) {
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    const shipping = subtotal > 0 ? 5.00 : 0;
    if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;

    const tax = subtotal * 0.1;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;

    const total = subtotal + shipping + tax;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  // Render logic for shop.html product cards
  function renderShopPageCards() {
    const qtyControls = document.querySelectorAll('[data-qty-controls]');
    if (qtyControls.length === 0) return;

    qtyControls.forEach(controls => {
      const productId = controls.dataset.productId;
      const cartItem = cart.find(item => item.id === productId);
      const addBtn = document.querySelector(`[data-add-to-cart][data-product-id="${productId}"]`);

      if (cartItem) {
        if (addBtn) addBtn.classList.add('hidden');
        controls.classList.remove('hidden');
        controls.querySelector('[data-qty-value]').textContent = cartItem.qty;
      } else {
        if (addBtn) addBtn.classList.remove('hidden');
        controls.classList.add('hidden');
      }
    });
  }

  // --- Initializers ---

  // Handle Add to Cart clicks
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const product = {
        id: button.dataset.productId,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image
      };
      addItem(product);
    });
  });

  // Handle Shop Page Quantity Control clicks (Event Delegation)
  document.addEventListener('click', (e) => {
    const minusBtn = e.target.closest('[data-qty-minus]');
    const plusBtn = e.target.closest('[data-qty-plus]');

    if (minusBtn) {
      const controls = minusBtn.closest('[data-qty-controls]');
      if (controls) {
        updateQty(controls.dataset.productId, -1);
      }
    }

    if (plusBtn) {
      const controls = plusBtn.closest('[data-qty-controls]');
      if (controls) {
        updateQty(controls.dataset.productId, 1);
      }
    }
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showCartNotification('Redirecting to secure checkout...');
      setTimeout(() => {
        alert('Thank you for your order! This would typically redirect to Stripe.');
        cart = [];
        saveCart();
        window.location.href = 'index.html';
      }, 1500);
    });
  }

  // Initial render
  updateGlobalBadge();
  renderAll();

})();
