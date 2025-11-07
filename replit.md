# GRYPFIT Manufacturing Website

## Project Overview
A modern, fully responsive Next.js 16 website for GRYPFIT (Singhal Industries), showcasing gym machine parts and sports equipment manufacturing since 1995.

## Technology Stack
- **Framework:** Next.js 16.0.1 with App Router & Turbopack
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** React Icons  
- **Language:** TypeScript
- **Port:** 5000

## Project Structure
```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page
│   ├── about/             # About Us page
│   ├── products/          # Products catalog page
│   └── contact/           # Contact page
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── ProductCard.tsx
│   └── ProductModal.tsx
├── data/
│   └── products.json      # Product catalog data
└── public/
    ├── images/            # General images
    └── products/          # Product images
```

## Key Features
1. **Hero Section** - GRYPFIT branding with "Precision. Strength. Trust." tagline
2. **Product Catalog** - JSON-based, searchable, filterable by category
3. **Company Timeline** - 25+ years journey from 1995 to 2025
4. **Contact Integration** - WhatsApp floating button, mailto form, Google Maps
5. **SEO Optimized** - Meta tags and Open Graph tags on all pages
6. **Fully Responsive** - Mobile-first design with Tailwind CSS

## Product Management (No Coding Required)
Users can manage products by editing `data/products.json`:
- Add new products by copying existing JSON objects
- Edit prices, descriptions, SKUs, categories
- Delete products by removing JSON objects
- Replace images in `public/products/` folder

**Important:** Product images should be added to `/public/products/` and referenced without the `/public` prefix in the JSON (e.g., `"/products/image.jpg"`).

## Contact Information
- **Address:** Singhal Industries, Mohkampur Phase 1, Meerut, India
- **Phone:** +91-8449291260
- **Email:** amolsinghal95@gmail.com
- **Domain:** www.gryp.fit

## Development
- Run development server: `npm run dev` (port 5000)
- Build for production: `npm run build`
- Start production server: `npm start`

## Deployment
Ready for Vercel deployment:
1. Push code to GitHub
2. Import repository to Vercel
3. Auto-detected Next.js configuration
4. Connect custom domain www.gryp.fit in Vercel dashboard

## Design Theme
- **Colors:** Dark grey background (#1C1C1C), metallic blue (#0070F3) accents
- **Typography:** Inter font family
- **Style:** Industrial + Modern
- **Animations:** Subtle Framer Motion effects

## User Preferences
- Clean, professional industrial design
- Easy product management without code editing
- Mobile-responsive across all devices
- Fast WhatsApp integration for customer inquiries

## Recent Changes (Nov 7, 2025)
- Initial project setup with Next.js 16 and Tailwind CSS 3
- Created all main pages (Home, About, Products, Contact)
- Built reusable component library
- Configured products.json with 12 sample products
- Set up SEO metadata for all pages
- Integrated WhatsApp floating button
- Added comprehensive README for non-technical users
