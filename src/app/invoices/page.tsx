'use client';

import Header from '@/components/header';
import InvoiceSystem from '@/components/invoice-system';

export default function InvoicesPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600 mt-2">
            Create, manage, and track invoices with automated receipts
          </p>
        </div>

        <InvoiceSystem />
      </main>
    </>
  );
}
