# GRYPFIT - Manufacturing Website

A modern, fully responsive website for GRYPFIT (Singhal Industries), showcasing gym machine parts and sports equipment manufacturing since 1995.

## 🏭 About GRYPFIT

**Brand:** GRYPFIT (by Singhal Industries)  
**Tagline:** Precision. Strength. Trust. — Crafting quality spare parts since 1995  
**Website:** grypfitweb.vercel.app , www.gryp.fit

GRYPFIT is a trusted manufacturer of spare parts for gym machines and sports equipment, serving top brands across India with 25+ years of experience.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Language:** TypeScript
- **Deployment:** Vercel-ready

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Clone or download this repository**

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit `http://localhost:5000`

## 📝 Managing Products (No Coding Required!)

### Adding a New Product

1. Open the file: `data/products.json`

2. Add a new product object to the array:
```json
{
  "id": 13,
  "title": "Your Product Name",
  "sku": "SKU123",
  "price": "₹999",
  "shortDescription": "Brief description for card view",
  "longDescription": "Detailed description shown in modal with features and specifications",
  "category": "Gym",
  "image": "/products/yourimage.jpg"
}
```

3. **Important:** Make sure the `id` is unique and incremental

4. Save the file - changes will appear automatically!

### Editing an Existing Product

1. Open `data/products.json`
2. Find the product by its `id` or `title`
3. Update any field (title, price, description, etc.)
4. Save the file

### Deleting a Product

1. Open `data/products.json`
2. Find and remove the entire product object (including its curly braces)
3. Make sure the remaining JSON is valid (proper commas between objects)
4. Save the file

### Categories

Available categories (must match exactly):
- `Gym` - For gym equipment parts
- `Sports` - For sports equipment
- `Plates & Weights` - For weight plates and sets

## 🖼️ Managing Images

### Adding Product Images

1. **Add your image to:** `public/products/`
   - Example: `public/products/myproduct.jpg`

2. **Update the product in** `data/products.json`:
```json
"image": "/products/myproduct.jpg"
```

3. **Supported formats:** JPG, PNG, SVG, WebP

### Image Guidelines

- **Recommended size:** 800x600 pixels or similar aspect ratio
- **File size:** Keep under 500KB for faster loading
- **File naming:** Use descriptive names (e.g., `cable-pulley-steel.jpg`)

### Replacing Placeholder Images

**Important:** The project includes sample product data, but placeholder images are not included by default. Before deploying or showing the website to customers, you MUST add your actual product images.

To add real product images:

1. Take professional photos of your actual products (800x600px recommended)
2. Save them to the `public/products/` folder with descriptive names
3. Update the `image` field in `data/products.json` to match your filenames
4. You can use the existing filenames (`pulley1.jpg`, `plate1.jpg`, etc.) or create new ones

**Note:** The website will display a fallback message for missing images until you add real product photos.

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js - click "Deploy"
6. Wait 2-3 minutes for deployment

### Step 3: Connect Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add domain: `www.gryp.fit`
4. Follow Vercel's instructions to update DNS records
5. Your domain provider should point to Vercel's nameservers

**DNS Configuration Example:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

## 📱 Features

### Pages
- **Home** - Hero section, categories, company highlights
- **About Us** - Company timeline, story, and achievements
- **Products** - Filterable product catalog with search
- **Contact** - Contact form, map, and company details

### Components
- Responsive navigation header
- Product cards with hover animations
- Product detail modals
- WhatsApp floating button
- Footer with social links
- Mobile-friendly design

### Functionality
- Client-side search and filtering
- Category-based product browsing
- Product detail modals
- WhatsApp integration (+91-8449291260)
- Email contact form (opens mailto)
- Google Maps embed for location

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  background: "#1C1C1C",  // Dark grey background
  foreground: "#FFFFFF",   // White text
  primary: "#0070F3",      // Metallic blue accent
  secondary: "#333333",    // Secondary grey
}
```

### Updating Contact Information

Edit `app/contact/page.tsx` and update:
- Phone number
- Email address
- Physical address
- Google Maps embed URL

Also update in:
- `components/Footer.tsx`
- `components/WhatsApp Button.tsx`

### Changing Logo/Brand Name

1. Replace "GRYPFIT" text in `components/Header.tsx`
2. Or add a logo image to `public/images/logo.png`
3. Update the header component to use the image

## 📞 Contact Details

**Address:** Singhal Industries, Mohkampur Phase 1, Meerut, India  
**Phone:** +91-8449291260  
**Email:** amolsinghal95@gmail.com  
**WhatsApp:** +91-8449291260

## 🛠️ Scripts

```bash
npm run dev      # Start development server (port 5000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 License

© 2025 GRYPFIT - Singhal Industries. All rights reserved.

## 🆘 Support

For technical support or questions about the website, contact the development team or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Built with ❤️ for GRYPFIT - Precision. Strength. Trust.**
