# Meowmart

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)

**Developed by Sirri Ayongwa**

Meowmart is a modern, full-featured e-commerce platform built specifically for cat lovers. It's a stylish, responsive storefront for everything feline—from accessories and toys to apparel and essentials. Whether you're shopping for your own cat or looking for the perfect gift for a cat-loving friend, Meowmart offers a smooth and intuitive shopping experience.

## Features

### Core Functionality
- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Product Gallery** - Beautiful grid layout with filtering and sorting options
- **Shopping Cart** - Real-time cart updates with quantity adjustments
- **Wishlist System** - Save your favorite cat items for later
- **Advanced Search** - Quick product search with filtering capabilities
- **Blog Section** - Tips, guides, and cat adoption stories
- **Multi-page Navigation** - Seamless routing with React Router

### User Experience
- **Cart Drawer** - Slide-out cart for easy access while shopping
- **Wishlist Drawer** - Quick access to saved items
- **Product Quick View** - Preview products without leaving the page
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Smooth loading indicators for better UX

### Authentication & Security
- **User Registration** - Sign up with email and password
- **User Login** - Secure authentication with Supabase
- **Password Reset** - Email-based password recovery
- **Protected Routes** - Secure access to user-specific features

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Vite 5** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Zod** - Schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage

### UI Components
- **shadcn/ui** - Reusable UI components
- **Custom Components** - Tailored for Meowmart's design system

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn or bun
- A Supabase account (free tier works)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sirri-ayongwa/Meowmart.git
cd Meowmart
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings → API
3. Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY`
4. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Database Migrations

Navigate to the Supabase SQL Editor and run the migrations in order from the `supabase/migrations/` directory:

1. `20260607140344_6b0a31cc-c613-4bd4-816e-29d591efdc50.sql` - Create profiles table
2. `20260607140405_19c39765-4f60-45fc-a0ca-04ebc0cbc031.sql` - Revoke function permissions
3. `20260607143437_25cd51f0-5f75-4170-8b5f-36cc798a09bf.sql` - Create orders table
4. `20260608012200_add_email_to_profiles.sql` - Add email column to profiles
5. `20260608012300_sync_existing_emails.sql` - Sync existing emails
6. `20260608012400_update_handle_new_user.sql` - Update user creation trigger
7. `20260608013700_add_rls_policy_for_email_check.sql` - Add RLS policy for email checking

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
meowmart-app/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/         # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── BlogCard.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── FeaturedCategories.tsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── Login.tsx
│   │   └── ...
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── supabase/
│   ├── functions/          # Supabase edge functions
│   └── migrations/         # Database migrations
├── .env                    # Environment variables
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Usage

### Shopping
- Browse products in the Shop section
- Use the search bar to find specific items
- Add products to cart or wishlist
- Adjust quantities in the cart drawer
- Proceed to checkout

### Account Management
- Create an account to save your wishlist
- Sign in to access your account features
- Reset password if needed via email

### Navigation
- Use the header navigation to switch between pages
- Access cart and wishlist from the header icons
- Use the footer links for additional information

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tailwind CSS Configuration

Customize the design system in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        'meow-purple': '#your-color',
        'meow-gray': '#your-color',
        // Add custom colors
      },
      fontFamily: {
        cursive: ['your-font', 'sans-serif'],
      },
    },
  },
}
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

### Other Platforms

The app can be deployed to any platform that supports static sites:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
6. I'll review and merge your changes, only if it's a good fit for the project

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- The cat community for inspiration

## Contact

- Developer: [Sirri Ayongwa](https://sirri-portfolio-7lisv8t.gamma.site)
- Project Link: [https://github.com/sirri-ayongwa/Meowmart](https://github.com/sirri-ayongwa/Meowmart)

## Tags

cat ecommerce, online cat store, cat supplies, cat toys, cat accessories, pet boutique, feline gifts, cat lover gifts, Vite React Tailwind, TypeScript ecommerce, responsive pet shop, pet care blog, cat adoption, cat healthcare, cat product showcase, open source ecommerce template, e‑commerce boilerplate
