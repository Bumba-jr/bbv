# Next.js Laundry Management System - Setup Guide

## Project Overview
This is a modern Next.js 16 conversion of the original HTML/CSS/JavaScript Laundry Management System. All original functionality has been preserved and enhanced with React components.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload on file changes

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Dashboard (Home)
│   ├── new-order/page.tsx       # Create New Orders
│   ├── all-orders/page.tsx      # View All Orders
│   ├── customer-portal/page.tsx # Customer Management
│   ├── payment-reports/page.tsx # Payment Analytics
│   ├── settings/page.tsx        # System Settings
│   ├── layout.tsx               # Root Layout
│   └── globals.css              # Global Styles
├── components/
│   ├── header.tsx               # Navigation Header
│   ├── stat-card.tsx            # Statistics Cards
│   ├── revenue-chart.tsx        # Revenue Visualization
│   ├── expenses-chart.tsx       # Expense Tracking
│   ├── service-popularity.tsx   # Service Analytics
│   ├── payment-status.tsx       # Payment Dashboard
│   ├── customer-history.tsx     # Customer Records
│   ├── order-form.tsx           # Order Creation Form
│   └── page-loader.tsx          # Loading Spinner
└── hooks/
    └── use-year-carousel.ts     # Year Navigation Hook

public/
└── assets/                      # Images, Logos, Favicon
```

## Features

✅ **Dashboard** - Overview of revenue, expenses, and key metrics
✅ **New Orders** - Create and manage new laundry orders
✅ **All Orders** - Search, filter, and view complete order history
✅ **Customer Portal** - Customer management and profiles
✅ **Payment Reports** - Financial tracking and analytics
✅ **Settings** - Configure business preferences and services

## Technology Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 3.4
- **Notifications**: Sonner
- **Language**: TypeScript
- **Build Tool**: Turbopack (default in Next.js 16)

## Development Notes

- All components are **Client Components** (`'use client'`) for interactivity
- Responsive design with mobile-first approach
- Pre-built with Tailwind CSS utilities
- Toast notifications for user feedback
- Year carousel for date navigation

## Deployment

Deploy to Vercel with one click:
1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic deployment on every push

Or use: `npm run build && npm start`

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails?**
```bash
npm run build -- --verbose
```

## Next Steps

1. Connect to backend API (Firebase, Supabase, etc.)
2. Add authentication system
3. Implement real data persistence
4. Deploy to production

For more details, see `MIGRATION_GUIDE.md`
