# Laundry Management System - Next.js Migration Guide

## Overview

This document outlines the complete migration of the Laundry Management System from vanilla HTML/CSS/JavaScript to Next.js with React components.

## What Was Migrated

### Previous Structure (HTML/CSS/JS)
- **index.html** - Dashboard page
- **new-order.html** - Order creation page
- **all-orders.html** - Orders listing page
- **customer-portal.html** - Customer management
- **payment-reports.html** - Payment tracking
- **settings.html** - Configuration page
- **app.js** - Frontend logic
- **script.js** - Chart and utility functions
- Inline CSS and Font Awesome icons

### New Structure (Next.js)
```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata & providers
│   ├── globals.css             # Global styles & design tokens
│   ├── page.tsx                # Dashboard page (/)
│   ├── new-order/
│   │   └── page.tsx            # New order page (/new-order)
│   ├── all-orders/
│   │   └── page.tsx            # All orders page (/all-orders)
│   ├── customer-portal/
│   │   └── page.tsx            # Customer portal (/customer-portal)
│   ├── payment-reports/
│   │   └── page.tsx            # Payment reports (/payment-reports)
│   └── settings/
│       └── page.tsx            # Settings page (/settings)
├── components/
│   ├── header.tsx              # Main header navigation
│   ├── stat-card.tsx           # Statistics card component
│   ├── page-loader.tsx         # Loading spinner
│   ├── revenue-chart.tsx       # Revenue visualization
│   ├── expenses-chart.tsx      # Expenses visualization
│   ├── service-popularity.tsx  # Service popularity chart
│   ├── payment-status.tsx      # Payment status overview
│   ├── customer-history.tsx    # Customer history table
│   └── order-form.tsx          # Order creation form
└── hooks/
    └── use-year-carousel.ts    # Year selector hook
```

## Key Changes

### 1. **Framework Migration**
- Replaced CDN-based Tailwind with npm package
- Removed react-hot-toast, replaced with sonner for toast notifications
- Updated from vanilla JavaScript to React hooks (useState, useEffect)

### 2. **Component Architecture**
- Created reusable React components for all UI elements
- Implemented proper prop drilling and component composition
- Separated concerns with dedicated components for forms, charts, tables, etc.

### 3. **Styling**
- Maintained Tailwind CSS utility classes
- Removed inline styles where possible
- Added CSS custom properties for design tokens
- Preserved Font Awesome icons with CDN import

### 4. **Dependencies**

#### Removed
- react-hot-toast (replaced with sonner)
- @heroicons/react (replaced with Font Awesome)
- Various UI component libraries

#### Kept/Added
```json
{
  "dependencies": {
    "next": "16.0.7",
    "react": "^19",
    "react-dom": "^19",
    "sonner": "^1.7.1",
    "autoprefixer": "^10.4.20",
    "tailwindcss": "^3.4.17"
  }
}
```

## Pages Included

### 1. Dashboard (`/`)
- Revenue statistics cards (Today, Month, Year)
- Customer count card
- Weekly/Yearly revenue charts
- Weekly/Yearly expense charts
- Service popularity analysis
- Payment status overview
- Customer history table
- Quick order form

### 2. New Order (`/new-order`)
- Customer information form
- Pickup details section
- Items management (add/remove)
- Order summary sidebar
- Quick tips panel

### 3. All Orders (`/all-orders`)
- Orders table with filtering
- Search by customer name/phone
- Status filtering (Pending, Processing, Completed, Cancelled)
- Pagination support
- View/Edit/Delete actions

### 4. Customer Portal (`/customer-portal`)
- Customer list with search
- Pagination
- Customer details sidebar
- Total orders and spending metrics
- Member since date

### 5. Payment Reports (`/payment-reports`)
- Revenue statistics
- Date range filtering
- Payment transactions table
- Payment method tracking
- Status indicators
- Export options (Excel, PDF, CSV)

### 6. Settings (`/settings`)
- General settings (business name, currency)
- Business information (phone, email, address)
- Business hours configuration
- Billing & tax settings
- Notification preferences
- Security options

## Features Preserved

✅ Responsive design (mobile-first)
✅ Tab navigation and year carousel
✅ Form validation
✅ Toast notifications
✅ Loading states
✅ Search and filter functionality
✅ Pagination
✅ Data presentation with tables and cards
✅ Modal overlays
✅ Animations and transitions
✅ Font Awesome icons
✅ Professional UI/UX

## New Features

✅ Server-side rendering capabilities
✅ Better code organization
✅ Component reusability
✅ Type safety with TypeScript
✅ Improved performance
✅ Better SEO metadata
✅ Built-in image optimization support
✅ API route support for backend integration

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## Integration Points

### Firebase Integration (Ready for Implementation)
The app is structured to support Firebase integration:
- Authentication can be added to the layout
- Firestore queries for orders and customers
- Cloud Functions for backend logic
- Real-time data updates

### API Integration (Ready for Implementation)
- Create API routes in `src/app/api/`
- Fetch data from any backend service
- Server-side data fetching in Server Components

## File Mapping Reference

| Old File | New Location | Type |
|----------|--------------|------|
| index.html | src/app/page.tsx | Page |
| new-order.html | src/app/new-order/page.tsx | Page |
| all-orders.html | src/app/all-orders/page.tsx | Page |
| customer-portal.html | src/app/customer-portal/page.tsx | Page |
| payment-reports.html | src/app/payment-reports/page.tsx | Page |
| settings.html | src/app/settings/page.tsx | Page |
| N/A | src/components/header.tsx | Component |
| N/A | src/components/order-form.tsx | Component |
| N/A | src/components/stat-card.tsx | Component |
| N/A | src/hooks/use-year-carousel.ts | Hook |

## Best Practices Applied

1. **Component Composition** - Small, focused components with single responsibilities
2. **Custom Hooks** - Encapsulated reusable logic (useYearCarousel)
3. **Prop Drilling** - Clean prop interfaces for component communication
4. **CSS-in-JS** - Tailwind utilities for consistent styling
5. **Error Handling** - Toast notifications for user feedback
6. **Accessibility** - Semantic HTML, ARIA labels where needed
7. **Performance** - Lazy loading ready, image optimization support
8. **Type Safety** - TypeScript for better development experience

## Next Steps for Full Integration

1. **Backend Integration**
   - Set up API routes in `src/app/api/`
   - Integrate with Firebase or your preferred backend
   - Implement authentication

2. **Database Integration**
   - Connect Firestore or PostgreSQL
   - Implement data persistence
   - Set up RLS (Row-Level Security)

3. **Advanced Features**
   - Add real-time updates with WebSockets
   - Implement advanced filtering
   - Add export functionality
   - Create reporting dashboards

4. **Testing**
   - Add Jest configuration
   - Write unit tests for components
   - Add E2E tests with Cypress/Playwright

5. **Deployment**
   - Deploy to Vercel (recommended for Next.js)
   - Configure environment variables
   - Set up CI/CD pipeline

## Troubleshooting

### Issue: Styles not loading
**Solution:** Ensure `globals.css` is imported in layout.tsx and Tailwind is properly configured.

### Issue: Components not rendering
**Solution:** Check that all imports are correct and components are exported as default.

### Issue: Navigation not working
**Solution:** Verify that Link components are using correct href paths relative to app directory.

## Support

For questions or issues during the migration, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
