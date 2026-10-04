# ALDEN ONE - Source Tree Documentation

## Deployment Structure

```
alden-one/                          # Main hub repository (alden-one.com)
├── ARCHITECTURE.md                 # Digital hub architecture and design DNA
├── SOURCE_TREE.md                  # This file
├── README.md                       # Project documentation
├── package.json                    # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
├── jsconfig.json                  # JavaScript configuration
├── components.json               # Shadcn/ui components configuration
├── index.html                     # Entry HTML file
├── .gitignore                     # Git ignore rules
├── package-lock.json              # Dependency lock file
│
├── public/                         # Static assets
│   └── images/
│       └── 5BC0F55F-2624-4CB5-8C13-D1B70DD77DB3.PNG  # Core page background
│
├── src/                           # Source code (main hub)
│   ├── main.jsx                  # Application entry point
│   ├── App.jsx                   # Main app with routing
│   ├── index.css                 # Global styles
│   │
│   ├── components/               # Reusable components
│   │   ├── home/                 # Home-specific components
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Footer.jsx       # Simple footer
│   │   │   ├── Footer.jsx # Footer with music player
│   │   │   ├── HeroSection.jsx   # Hero with parallax
│   │   │   ├── StickyScrollShowcase.jsx  # Studios showcase
│   │   │   ├── MarqueeStrip.jsx  # Scrolling marquee
│   │   │   ├── EcosystemSection.jsx  # Ecosystem overview
│   │   │   └── AboutSection.jsx  # About section
│   │   ├── ui/                   # Shadcn/ui components
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   └── UserNotRegisteredError.jsx  # Error component
│   │
│   ├── pages/                    # Page components (main hub)
│   │   ├── StudiosPage.jsx      # Studios hub page
│   │   ├── EcosystemPage.jsx    # Ecosystem overview
│   │   ├── WhoWeArePage.jsx     # About/Who We Are page
│   │   ├── CorePage.jsx         # Core portfolio page
│   │   ├── PhotographyPortfolioPage.jsx  # Photography portfolio
│   │   ├── WebPortfolioPage.jsx # Web portfolio
│   │   ├── PhotoStudioServicesPage.jsx   # Photo Studio services
│   │   └── WebStudioServicesPage.jsx     # Web Studio services
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── use-mobile.jsx       # Mobile detection hook
│   │
│   ├── lib/                      # Utilities and configurations
│   │   ├── AuthContext.jsx       # Authentication context
│   │   ├── query-client.js      # React Query client
│   │   ├── app-params.js        # Application parameters
│   │   ├── utils.js             # Utility functions
│   │   └── PageNotFound.jsx      # 404 page
│   │
│   ├── api/                      # API clients
│   │   └── base44Client.js      # Base44 API client
│   │
│   └── utils/                    # Utility functions
│       └── index.ts             # TypeScript utilities
│
├── alden-farm/                    # Separate project → alden-farm.com
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx       # Farm-themed navbar
│   │   └── pages/
│   │       └── FarmPage.jsx
│   └── public/
│
├── alden-studio/                  # Separate project → alden-studio.com
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx       # Studio-themed navbar
│   │   └── pages/
│   │       ├── ServicesPage.jsx
│   │       ├── PortfolioPage.jsx
│   │       └── BookingPage.jsx
│   └── public/
│
├── alden-springs/                 # Separate project → alden-springs.com
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx       # Springs-themed navbar
│   │   └── pages/
│   │       ├── HomePage.jsx
│   │       └── EarlyAccessPage.jsx
│   └── public/
│
└── alden-build/                    # Separate project → alden-build.com
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── components/
    │   │   └── Navbar.jsx       # Build-themed navbar
    │   └── pages/
    │       ├── BuildPage.jsx
    │       ├── ServicesPage.jsx
    │       └── WaitlistPage.jsx
    └── public/
```

## Page Routing Structure

```javascript
// App.jsx Routes (Main Hub - alden-one.com)
/                           → Home (Hero + Studios + Ecosystem + Core + About)
/studios                   → Studios hub (links to venture domains)
/ecosystem                 → Ecosystem overview (links to venture domains)
/farm                      → Redirects to alden-farm.com
/build                     → Redirects to alden-build.com
/springs                   → Redirects to alden-springs.com
/about/who-we-are          → About page
/about                     → About page (redirect)
/portfolio/photography     → Photography portfolio
/portfolio/web             → Web portfolio
/studios/photo-studio/services → Redirects to alden-studio.com
/studios/web-studio/services   → Web Studio services (part of main hub)
/core                      → Core portfolio page

// Separate Venture Domains
alden-farm.com             → ALDEN FARMS standalone site
alden-studio.com           → ALDEN PHOTO STUDIO standalone site
alden-springs.com          → ALDEN SPRINGS standalone site
alden-build.com            → ALDEN BUILD standalone site
```

## Component Hierarchy

### Home Page (/)
```
App.jsx
└── Home (inline component)
    ├── Navbar
    ├── HeroSection (parallax bg, ALDEN letters, role headings)
    ├── MarqueeStrip
    ├── StickyScrollShowcase (studios cards)
    ├── MarqueeStrip
    ├── EcosystemSection
    ├── AboutSection
    └── Footer (with music player)
```

### Venture Pages
```
App.jsx
└── [VenturePage]
    ├── Navbar
    ├── Hero Section (venture-specific)
    ├── Content Sections
    └── Footer
```

## Design DNA Implementation Plan

### Shared Components
- **Navbar**: Consistent across all pages, venture-specific active states
- **Footer**: Consistent branding, venture-specific links
- **Typography**: Koulen (headings), Roboto Mono (body) - shared across all

### Venture-Specific Components

#### ALDEN FARMS (/farm)
- Hero: Earthy background, farm imagery
- Color Palette: #8B7355, #556B2F, #D2B48C
- Components: Product cards, seasonal banners, affiliate links
- Animations: Organic transitions, nature-inspired

#### ALDEN PHOTO STUDIO (/studios/photo-studio/services)
- Hero: High-contrast photography, gallery-style
- Color Palette: #000000, #FFFFFF, accent colors
- Components: Portfolio galleries, service packages, booking forms
- Animations: Dramatic reveals, image transitions

#### ALDEN SPRINGS (/springs)
- Hero: Water effects, clean blue tones
- Color Palette: #1E90FF, #00CED1, #E0FFFF
- Components: Product showcase, purity indicators, early access signup
- Animations: Water ripple effects, clean transitions

#### ALDEN BUILD (/build)
- Hero: Industrial, blueprint aesthetic
- Color Palette: #2F4F4F, #696969, #A9A9A9
- Components: Project galleries, pricing calculator, service packages
- Animations: Structural reveals, blueprint drawing effects

## Future Enhancements

### Phase 1: Unique Design DNA
- [ ] Create venture-specific theme files
- [ ] Implement venture-specific hero components
- [ ] Add venture-specific animations
- [ ] Create venture-specific color palettes

### Phase 2: Enhanced Features
- [ ] Add venture-specific routing
- [ ] Create venture-specific layouts
- [ ] Implement venture-specific components
- [ ] Add venture-specific content management

### Phase 3: Advanced Features
- [ ] Add venture-specific CMS integration
- [ ] Implement venture-specific analytics
- [ ] Create venture-specific SEO optimization
- [ ] Add venture-specific performance optimization
