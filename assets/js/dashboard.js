// Explorer Dashboard Interactions
(function () {
    'use strict';

    // 1. Navigation Active State
    const navLinks = document.querySelectorAll('aside nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('bg-[var(--accent-orange)]', 'text-white', 'shadow-lg', 'shadow-[var(--accent-orange)]/30', 'font-bold');
                    link.classList.add('text-[var(--text-primary)]', 'font-semibold');

                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.remove('text-[var(--text-primary)]', 'font-semibold');
                        link.classList.add('bg-[var(--accent-orange)]', 'text-white', 'shadow-lg', 'shadow-[var(--accent-orange)]/30', 'font-bold');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // 2. Toy Box (Wishlist) Actions
    const toyBoxContainer = document.getElementById('toybox');
    if (toyBoxContainer) {
        // Add to Kit (Cart)
        toyBoxContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-primary');
            if (btn && btn.textContent.includes('Add to Kit')) {
                const card = btn.closest('.card-playful');
                const toyName = card.querySelector('h3').textContent;

                // Feedback
                const originalText = btn.textContent;
                btn.textContent = '✨ Added!';
                btn.style.backgroundColor = 'var(--accent-green)';

                // Update Global Cart (Simulation)
                const cartBadge = document.getElementById('cart-badge');
                if (cartBadge) {
                    let count = parseInt(cartBadge.textContent || '0');
                    cartBadge.textContent = count + 1;
                    cartBadge.classList.remove('hidden');
                }

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            }

            // Remove from Toy Box
            const removeBtn = e.target.closest('button.text-red-500');
            if (removeBtn) {
                if (confirm('Move this toy back to the store shelf?')) {
                    const card = removeBtn.closest('.card-playful');
                    card.classList.add('scale-0', 'opacity-0');
                    setTimeout(() => card.remove(), 400);
                }
            }
        });
    }

    // 3. Explorer Profiles
    const addProfileBtn = document.querySelector('#explorers button.btn-primary');
    if (addProfileBtn) {
        addProfileBtn.addEventListener('click', () => {
            const name = prompt("Explorer's Name:");
            const age = prompt("Explorer's Age:");
            if (name && age) {
                const profileGrid = document.querySelector('#explorers .grid');
                const newProfile = document.createElement('div');
                newProfile.className = 'card-playful border-l-[8px] border-l-[var(--accent-blue)] flex items-center space-x-4 animate-pop';
                newProfile.innerHTML = `
                    <div class="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center text-3xl">🚀</div>
                    <div>
                        <h3 class="font-bold text-lg text-[var(--text-primary)]">${name} (${age} yrs)</h3>
                        <p class="text-sm text-[var(--text-secondary)]">New Explorer!</p>
                    </div>
                `;
                profileGrid.appendChild(newProfile);
            }
        });
    }

    // 4. Smooth Scrolling for Sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                window.scrollTo({
                    top: targetSec.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Mobile Drawer Logic
    const drawer = document.getElementById('mobile-dashboard-drawer');
    const drawerOpenBtn = document.getElementById('mobile-dashboard-toggle');
    const drawerCloseBtn = document.getElementById('mobile-dashboard-close');
    const drawerOverlay = document.getElementById('mobile-dashboard-overlay');
    const mobileNav = document.getElementById('mobile-dashboard-nav');
    const desktopNav = document.querySelector('aside nav ul');

    if (drawer && drawerOpenBtn && mobileNav && desktopNav) {
        // Function to handle drawer state
        function toggleDrawer(open) {
            const drawerContent = drawer.querySelector('.absolute.inset-y-0');
            if (open) {
                drawer.classList.remove('hidden');
                setTimeout(() => {
                    drawerContent.classList.remove('translate-x-full');
                }, 10);
                document.body.style.overflow = 'hidden';
            } else {
                drawerContent.classList.add('translate-x-full');
                setTimeout(() => {
                    drawer.classList.add('hidden');
                }, 300);
                document.body.style.overflow = '';
            }
        }

        // Clone desktop nav content (including logout) to mobile drawer if empty
        if (mobileNav.children.length === 0) {
            const sidebarNav = document.querySelector('aside nav');
            if (sidebarNav) {
                // Clone all children of the sidebar nav (ul + logout div)
                Array.from(sidebarNav.children).forEach(child => {
                    const clone = child.cloneNode(true);
                    const links = clone.querySelectorAll('a');
                    links.forEach(link => {
                        link.classList.add('justify-center');
                        link.addEventListener('click', () => toggleDrawer(false));
                    });
                    mobileNav.appendChild(clone);
                });
            }
        }

        drawerOpenBtn.addEventListener('click', () => toggleDrawer(true));
        drawerCloseBtn?.addEventListener('click', () => toggleDrawer(false));
        drawerOverlay?.addEventListener('click', () => toggleDrawer(false));
    }

})();
