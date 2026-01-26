# PlayNest - Premium Toy Store Template

A professional, retail-grade HTML template for toy stores (Brick & Click). Built with TailwindCSS, vanilla JavaScript, and designed to meet ThemeForest quality standards.

## 🎯 Website Identity

- **Name**: PlayNest
- **Type**: Toy Store (Brick & Click Retail)
- **Focus**: Educational & premium toys (kids + parents)
- **Target Audience**: Parents (25–45), gift buyers, kids (indirect)

## 🎨 Design System

### Color Palette

#### Light Mode
- Background: `#FFF9F2`
- Surface: `#FFFFFF`
- Primary Text: `#1F2937`
- Secondary Text: `#4B5563`
- Primary Accent: `#F97316` (Playful Orange)
- Secondary Accent: `#22C55E` (Fresh Green)
- Info Accent: `#3B82F6` (Blue)
- Borders: `rgba(0,0,0,0.08)`

#### Dark Mode
- Background: `#0F172A`
- Surface: `#1E293B`
- Primary Text: `#F8FAFC`
- Secondary Text: `#CBD5E1`
- Accent Orange: `#FB923C`
- Accent Green: `#4ADE80`
- Accent Blue: `#60A5FA`
- Borders: `rgba(255,255,255,0.12)`

### Typography
- **Headings**: Poppins (400, 500, 600, 700)
- **Body/UI**: Inter (400, 500, 600)
- **Buttons**: Poppins Medium
- **Line-height**: Body 1.6, Headings 1.25

### Animations
- Page load: fade + scale(0.98 → 1)
- Product cards: hover lift + soft shadow
- Buttons: micro-bounce (max 4px)
- Cart icon: subtle shake on add
- Respects `prefers-reduced-motion`

### UI Style Rules
- Glassmorphism: Navbar & promo banners (subtle)
- Rounded system: Cards 18px, Buttons 14px, Inputs 12px
- No neomorphism
- One accent per section (max)
- No gradients behind text
- Text contrast always WCAG AA

## 📁 File Structure

```
/toy-store/
│
├── assets/
│   ├── css/
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── animations.css
│   ├── js/
│   │   ├── theme-toggle.js
│   │   ├── navbar.js
│   │   └── cart-ui.js
│   └── images/
│
├── index.html          (Home v1)
├── home-2.html         (Home v2 - different layout)
├── about.html
├── shop.html
├── product-details.html
├── categories.html
├── offers.html
├── blog.html
├── blog-details.html
├── contact.html
├── login.html
├── signup.html
├── 404.html
└── README.md
```

## 📄 Pages Included

1. **index.html** - Home page v1 with hero, featured products, categories
2. **home-2.html** - Home page v2 with different hero and product layout
3. **about.html** - About us page
4. **shop.html** - Product listing with filters
5. **product-details.html** - Single product page
6. **categories.html** - Category showcase
7. **offers.html** - Special offers and discounts
8. **blog.html** - Blog listing
9. **blog-details.html** - Single blog post
10. **contact.html** - Contact form
11. **login.html** - Login page
12. **signup.html** - Sign up page
13. **404.html** - Error page

## 🚀 Features

- ✅ Fully responsive (mobile-first)
- ✅ Light/Dark mode toggle
- ✅ Sticky navbar with glassmorphism
- ✅ Static cart UI (no backend)
- ✅ Smooth animations
- ✅ WCAG AA compliant contrast
- ✅ Semantic HTML5
- ✅ TailwindCSS styling
- ✅ Vanilla JavaScript (no frameworks)

## 🛠️ Technology Stack

- **HTML5** (semantic)
- **TailwindCSS** (via CDN)
- **Vanilla JavaScript**
- **CSS Variables** for theming

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🎯 Usage

1. Open any HTML file in a browser
2. The theme toggle is in the navbar
3. All pages are fully functional (UI only, no backend)
4. Cart functionality is static (UI demonstration)

## 📝 Notes

- Images use Unsplash placeholders - replace with actual toy images
- All forms are UI-only (no backend integration)
- Cart functionality is static (for demonstration)
- Theme preference is saved in localStorage

## 📄 License

This template is designed for ThemeForest marketplace standards.

## 🎨 Customization

To customize colors, edit the CSS variables in `assets/css/tailwind.css`:

```css
:root {
  --bg-primary: #FFF9F2;
  --accent-orange: #F97316;
  /* ... */
}
```

## ✨ Quality Standards

- ✅ No overlapping elements
- ✅ No low-contrast text
- ✅ No visibility issues
- ✅ Mobile-first responsive
- ✅ Clean, semantic code
- ✅ ThemeForest-ready

---

**PlayNest** - Premium Educational Toys Template

