// Shop Filtering and Sorting Logic
(function () {
    'use strict';

    // Product Data
    const products = [
        {
            id: '1',
            name: 'Building Blocks Set',
            price: 29.99,
            category: 'Wooden Toys',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            description: 'Premium wooden blocks',
            featured: true,
            date: '2023-12-01'
        },
        {
            id: '2',
            name: 'STEM Robot Kit',
            price: 49.99,
            category: 'STEM Kits',
            image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop',
            description: 'Build and program',
            featured: true,
            date: '2024-01-10'
        },
        {
            id: '3',
            name: 'Premium Puzzle Set',
            price: 19.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=400&fit=crop',
            description: '100-piece collection',
            featured: false,
            date: '2023-11-20'
        },
        {
            id: '4',
            name: 'Musical Instruments',
            price: 34.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
            description: 'Complete rhythm set',
            featured: false,
            date: '2023-10-15'
        },
        {
            id: '5',
            name: 'Wooden Train Set',
            price: 39.99,
            category: 'Wooden Toys',
            image: 'https://images.unsplash.com/photo-1518183214770-9cffbec72538?w=400&h=400&fit=crop',
            description: 'Adventure on tracks',
            featured: true,
            date: '2024-01-05'
        },
        {
            id: '6',
            name: 'Science Lab Kit',
            price: 54.99,
            category: 'STEM Kits',
            image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=400&h=400&fit=crop',
            description: 'Little scientist kit',
            featured: true,
            date: '2024-01-15'
        },
        {
            id: '7',
            name: 'Deluxe Art & Craft Kit',
            price: 24.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
            description: 'Unleash creativity',
            featured: false,
            date: '2023-12-15'
        },
        {
            id: '8',
            name: 'Backyard Play Set',
            price: 89.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=400&h=400&fit=crop',
            description: 'Active outdoor fun',
            featured: false,
            date: '2023-09-10'
        },
        {
            id: '9',
            name: 'Hug-a-Bear Plushie',
            price: 14.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=400&fit=crop',
            description: 'Soft and cuddly',
            featured: false,
            date: '2023-11-05'
        },
        {
            id: '10',
            name: 'Solar System Puzzle',
            price: 21.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop',
            description: 'Learn while play',
            featured: false,
            date: '2023-12-20'
        },
        {
            id: '11',
            name: 'Mini Chef Kitchen',
            price: 74.99,
            category: 'Educational',
            image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
            description: 'Creative roleplay',
            featured: true,
            date: '2024-01-20'
        },
        {
            id: '12',
            name: 'Turbo Speed RC Car',
            price: 44.99,
            category: 'STEM Kits',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
            description: 'High-speed thrills',
            featured: false,
            date: '2023-12-25'
        },
        {
            id: '13',
            name: 'Strategy Board Game',
            price: 39.99,
            category: 'Board Games',
            image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop',
            description: 'Fun for the whole family',
            featured: false,
            date: '2023-08-15'
        }
    ];

    // --- Selectors ---
    const productGrid = document.getElementById('product-grid');
    const sortSelect = document.getElementById('sort-select');
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const priceRadios = document.querySelectorAll('input[name="price"]');
    const productCountText = document.getElementById('product-count');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // Current State
    let filteredProducts = [...products];

    // --- Functions ---

    function renderProducts(items) {
        if (!productGrid) return;

        if (items.length === 0) {
            productGrid.innerHTML = `
                <div class="col-span-full py-12 text-center">
                    <p class="text-[var(--text-secondary)] italic">No products found matching your criteria.</p>
                </div>
            `;
            if (productCountText) productCountText.textContent = 'Showing 0 products';
            return;
        }

        productGrid.innerHTML = items.map(p => `
            <div class="card product-card p-4 flex flex-col fade-in">
                <a href="product-details.html" class="block group">
                    <div class="relative aspect-square rounded-[12px] overflow-hidden bg-[var(--bg-primary)] mb-4">
                        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <h3 class="font-heading font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-orange)] transition-colors">
                        ${p.name}
                    </h3>
                </a>
                <p class="text-sm text-[var(--text-secondary)] mb-4">${p.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-xl font-heading font-bold text-[var(--accent-orange)]">$${p.price.toFixed(2)}</span>
                    <div class="flex items-center">
                        <button data-add-to-cart 
                            data-product-id="${p.id}" 
                            data-name="${p.name}" 
                            data-price="${p.price}" 
                            data-image="${p.image}"
                            class="btn-primary py-2 px-4 text-sm whitespace-nowrap">Add to Cart</button>
                        <div data-qty-controls data-product-id="${p.id}"
                            class="hidden flex items-center space-x-2 bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-color)]">
                            <button data-qty-minus class="w-8 h-8 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] flex items-center justify-center">-</button>
                            <span data-qty-value class="w-8 text-center text-sm font-semibold text-[var(--text-primary)]">1</span>
                            <button data-qty-plus class="w-8 h-8 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] flex items-center justify-center">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        if (productCountText) productCountText.textContent = `Showing ${items.length} products`;

        // Re-run cart badge and control sync (defined in cart-ui.js global scope if possible, 
        // but here we manually call the global logic if we can or just rely on the fact that 
        // cart-ui.js is running and listens for clicks. Wait, cart-ui.js needs to re-sync the controls.)
        if (window.renderShopPageCards) {
            window.renderShopPageCards();
        }
    }

    function filterAndSort() {
        // 1. Get Filters
        const activeCategories = Array.from(categoryCheckboxes)
            .filter(i => i.checked)
            .map(i => i.nextElementSibling.textContent.trim());

        const activePriceRange = Array.from(priceRadios).find(i => i.checked)?.nextElementSibling.textContent.trim();

        // 2. Filter
        filteredProducts = products.filter(p => {
            const categoryMatch = activeCategories.length === 0 || activeCategories.includes(p.category);
            let priceMatch = true;

            if (activePriceRange) {
                if (activePriceRange === 'Under $25') priceMatch = p.price < 25;
                else if (activePriceRange === '$25 - $50') priceMatch = p.price >= 25 && p.price <= 50;
                else if (activePriceRange === '$50 - $100') priceMatch = p.price >= 50 && p.price <= 100;
                else if (activePriceRange === 'Over $100') priceMatch = p.price > 100;
            }

            return categoryMatch && priceMatch;
        });

        // 3. Sort
        const sortValue = sortSelect ? sortSelect.value : 'Sort by: Featured';
        if (sortValue === 'Price: Low to High') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'Price: High to Low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'Newest First') {
            filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            // Featured
            filteredProducts.sort((a, b) => b.featured - a.featured);
        }

        renderProducts(filteredProducts);
    }

    // --- Mobile Filter Toggle ---
    const mobileFilterButton = document.getElementById('mobile-filter-button');
    const closeFilterButton = document.getElementById('close-filter-button');
    const filterSidebar = document.getElementById('filter-sidebar');
    const filterBackdrop = document.getElementById('filter-backdrop');

    function openFilters() {
        if (filterSidebar && filterBackdrop) {
            filterSidebar.classList.remove('-translate-x-full');
            filterSidebar.classList.add('translate-x-0');
            filterBackdrop.classList.remove('hidden');
            // Prevent body scroll when filter is open
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFilters() {
        if (filterSidebar && filterBackdrop) {
            filterSidebar.classList.add('-translate-x-full');
            filterSidebar.classList.remove('translate-x-0');
            filterBackdrop.classList.add('hidden');
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    // --- Listeners ---

    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSort);
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterAndSort();
            // Close filter sidebar on mobile after applying filters
            if (window.innerWidth < 1024) {
                setTimeout(() => {
                    closeFilters();
                }, 300);
            }
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            categoryCheckboxes.forEach(i => i.checked = false);
            priceRadios.forEach(i => i.checked = false);
            if (sortSelect) sortSelect.selectedIndex = 0;
            filterAndSort();
        });
    }

    // Mobile filter toggle listeners
    if (mobileFilterButton) {
        mobileFilterButton.addEventListener('click', openFilters);
    }

    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', closeFilters);
    }

    if (filterBackdrop) {
        filterBackdrop.addEventListener('click', closeFilters);
    }

    // Close filters when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeFilters();
        }
    });

    // Initial Render
    filterAndSort();

})();
