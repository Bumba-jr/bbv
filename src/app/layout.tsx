import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Laundry Management System',
  description: 'Complete laundry business management solution with order tracking, customer portal, and analytics',
  keywords: ['laundry', 'management', 'orders', 'business', 'customer portal'],
  icons: {
    icon: '/assets/img/favicon/favicon.ico',
    apple: '/assets/img/favicon/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="apple-touch-icon" 
          sizes="180x180" 
          href="/assets/img/favicon/apple-touch-icon.png"
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="32x32" 
          href="/assets/img/favicon/favicon-32x32.png"
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="16x16" 
          href="/assets/img/favicon/favicon-16x16.png"
        />
        <link 
          rel="manifest" 
          href="/assets/img/favicon/site.webmanifest"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
