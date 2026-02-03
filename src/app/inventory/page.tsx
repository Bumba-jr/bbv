'use client';

import Header from '@/components/header';
import InventoryManagement from '@/components/inventory-management';

export default function InventoryPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your supplies and materials with real-time tracking
          </p>
        </div>

        <InventoryManagement />
      </main>
    </>
  );
}
