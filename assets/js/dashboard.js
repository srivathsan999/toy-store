// Dashboard Interactions
(function () {
    'use strict';

    // Wishlist Functionality
    const wishlistButtons = document.querySelectorAll('#wishlist .btn-primary');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            // Simulate adding to cart
            const card = this.closest('.card');
            const productName = card.querySelector('h3').textContent;

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.classList.add('bg-green-600', 'border-green-600');
            this.classList.remove('btn-primary');

            // Trigger cart shake/update (existing cart-ui.js logic would ideally handle this event)
            // But for simple direct interaction:
            const cartIcon = document.getElementById('cart-icon');
            if (cartIcon) {
                cartIcon.classList.add('cart-shake');
                setTimeout(() => {
                    cartIcon.classList.remove('cart-shake');
                }, 500);
            }

            // Update badge manually just for display if simple update
            const cartBadge = document.getElementById('cart-badge');
            if (cartBadge) {
                let count = parseInt(cartBadge.textContent || '0');
                cartBadge.textContent = count + 1;
                cartBadge.classList.remove('hidden');
            }

            // Revert button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('bg-green-600', 'border-green-600');
                this.classList.add('btn-primary');
            }, 2000);

            alert(`${productName} added to your cart!`);
        });
    });

    const removeButtons = document.querySelectorAll('#wishlist button.absolute');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Remove this item from your wishlist?')) {
                const card = this.closest('.card');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.remove();
                }, 300);
            }
        });
    });

    // Birthday Registry Interactions
    const createRegistryBtn = document.querySelector('#birthday button.btn-primary');
    if (createRegistryBtn) {
        createRegistryBtn.addEventListener('click', () => {
            const name = prompt("Enter the name for the new registry:");
            if (name) {
                alert(`New registry "${name}" created! (Demo only)`);
            }
        });
    }

    const editDetailsBtn = document.querySelector('#birthday button:nth-child(1)'); // roughly identifying edit button
    if (editDetailsBtn && editDetailsBtn.textContent.includes('Edit')) {
        editDetailsBtn.addEventListener('click', () => {
            alert('Edit Registry Details modal would open here.');
        });
    }

    const shareLinkBtn = document.querySelector('#birthday button:nth-child(2)');
    if (shareLinkBtn && shareLinkBtn.textContent.includes('Share')) {
        shareLinkBtn.addEventListener('click', () => {
            // Copy to clipboard simulation
            alert('Registry link copied to clipboard!');
        });
    }

    // Mobile Dashboard Drawer Logic
    const drawerToggle = document.getElementById('dashboard-menu-toggle');
    const drawer = document.getElementById('dashboard-drawer');
    const drawerOverlay = document.getElementById('dashboard-drawer-overlay');
    const drawerClose = document.getElementById('dashboard-drawer-close');
    const drawerLinks = document.querySelectorAll('[data-drawer-link]');

    if (drawerToggle && drawer && drawerOverlay) {
        const toggleDrawer = (show) => {
            if (show) {
                drawer.classList.remove('-translate-x-full');
                drawerOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                drawer.classList.add('-translate-x-full');
                drawerOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        };

        drawerToggle.addEventListener('click', () => toggleDrawer(true));
        drawerClose?.addEventListener('click', () => toggleDrawer(false));
        drawerOverlay.addEventListener('click', () => toggleDrawer(false));

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleDrawer(false);

                // Update active state manually for mobile drawer
                drawerLinks.forEach(l => {
                    l.classList.remove('bg-[var(--accent-orange)]', 'text-white', 'shadow-lg', 'shadow-[var(--accent-orange)]/20');
                    l.classList.add('text-[var(--text-secondary)]');
                    l.classList.remove('font-bold');
                    l.classList.add('font-semibold');
                });

                if (!link.textContent.includes('Logout')) {
                    link.classList.add('bg-[var(--accent-orange)]', 'text-white', 'shadow-lg', 'shadow-[var(--accent-orange)]/20');
                    link.classList.remove('text-[var(--text-secondary)]');
                    link.classList.add('font-bold');
                    link.classList.remove('font-semibold');
                }
            });
        });
    }

    // Sidebar smooth scroll active state
    const sidebarLinks = document.querySelectorAll('aside nav a');

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.flex-1 > div[id]'); // Get direct sections

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('bg-[var(--accent-orange)]', 'text-white');
            link.classList.add('text-[var(--text-secondary)]', 'hover:bg-[var(--bg-primary)]'); // Reset to default style
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('bg-[var(--accent-orange)]', 'text-white');
                link.classList.remove('text-[var(--text-secondary)]', 'hover:bg-[var(--bg-primary)]');
            }
        });
    });

})();
