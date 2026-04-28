# ALDEN ONE - Digital Hub Architecture

## Overview
ALDEN ONE is a digital hub that serves as the central platform for all ALDEN ventures. Each venture maintains its own unique design DNA, domain, and navigation while being seamlessly linked from the main hub.

## Deployment Structure

```
alden-one/                          # Main hub repository
├── (main hub files)                 # alden-one.com
├── alden-farm/                      # Separate project → alden-farm.com
├── alden-studio/                    # Separate project → alden-studio.com
├── alden-springs/                   # Separate project → alden-springs.com
└── alden-build/                     # Separate project → alden-build.com
```

Each venture is a standalone React project deployed to its own domain, linked from the main hub.

## Ventures

### 1. ALDEN HUB (Main Platform)
- **Domain**: alden-one.com
- **Purpose**: Central digital hub and navigation portal
- **Design DNA**: Minimalist, bold typography, dark theme with gold accents
- **Key Features**: 
  - Hero section with parallax background
  - Venture showcase cards (links to separate domains)
  - Core portfolio
  - About section
  - Navigation to all venture domains

### 2. ALDEN FARMS
- **Domain**: alden-farm.com
- **Purpose**: Sustainable agriculture and organic farming
- **Design DNA**: Earthy tones, organic shapes, green/nature color palette
- **Unique Elements**:
  - Custom navbar (farm-themed)
  - Farm imagery and textures
  - Product showcase with fresh produce visuals
  - Seasonal content updates
  - Affiliate integration for products
- **Link from hub**: /farm → redirects to alden-farm.com

### 3. ALDEN PHOTO STUDIO
- **Domain**: alden-studio.com
- **Purpose**: Professional photography services
- **Design DNA**: High-contrast, gallery-focused, monochrome with accent colors
- **Unique Elements**:
  - Custom navbar (studio-themed)
  - Portfolio galleries
  - Service packages
  - Booking system
  - Client testimonials
  - Before/after showcases
- **Link from hub**: /studios/photo-studio/services → redirects to alden-studio.com

### 4. ALDEN SPRINGS
- **Domain**: alden-springs.com
- **Purpose**: Natural spring water bottling and distribution
- **Design DNA**: Clean, refreshing, blue water tones, minimalist
- **Unique Elements**:
  - Custom navbar (springs-themed)
  - Water imagery and animations
  - Product showcase
  - Sustainability messaging
  - Early access signup
  - Purity indicators
- **Link from hub**: /springs → redirects to alden-springs.com

### 5. ALDEN BUILD
- **Domain**: alden-build.com
- **Purpose**: Construction and development services
- **Design DNA**: Industrial, structural, architectural blueprints, bold lines
- **Unique Elements**:
  - Custom navbar (build-themed)
  - Project galleries
  - Service packages
  - Blueprint visualizations
  - Pricing calculator
  - Coming soon countdown
- **Link from hub**: /build → redirects to alden-build.com

## Navigation Structure

```
ALDEN ONE (alden-one.com) - Main Hub
├── Home (/)
│   ├── Hero with parallax
│   ├── Studios showcase (links to venture domains)
│   ├── Ecosystem overview (links to venture domains)
│   ├── Core portfolio
│   └── About section
│
├── Ventures (redirect to separate domains)
│   ├── /farm → alden-farm.com
│   ├── /build → alden-build.com
│   ├── /springs → alden-springs.com
│   └── /studios/photo-studio/services → alden-studio.com
│
├── Portfolio
│   ├── /portfolio/photography
│   └── /portfolio/web
│
├── About
│   ├── /about/who-we-are
│   └── /core
│
└── Contact
    └── Footer with contact info

Separate Venture Domains
├── alden-farm.com (ALDEN FARMS)
├── alden-studio.com (ALDEN PHOTO STUDIO)
├── alden-springs.com (ALDEN SPRINGS)
└── alden-build.com (ALDEN BUILD)
```

## Design System per Venture

### Shared Elements
- Koulen font family for headings
- Roboto Mono for body text
- Responsive design
- Smooth animations
- Mobile-first approach

### Unique Identity per Venture
- **ALDEN HUB**: Black background, gold (#ccbb87) accents, bold typography
- **ALDEN FARMS**: Earth tones (#8B7355, #556B2F), organic shapes, nature imagery
- **ALDEN PHOTO STUDIO**: High contrast (#000000, #FFFFFF), gallery layouts, dramatic shadows
- **ALDEN SPRINGS**: Blue palette (#1E90FF, #00CED1), water effects, clean lines
- **ALDEN BUILD**: Industrial grays (#2F4F4F, #696969), blueprint aesthetics, structural lines

## Integration Strategy

Each venture will:
1. Share the main navigation (Navbar) for consistency
2. Have unique hero sections and color schemes
3. Use venture-specific components
4. Maintain the footer for unified branding
5. Link back to main hub seamlessly
