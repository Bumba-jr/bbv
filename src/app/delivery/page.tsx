'use client';

import Header from '@/components/header';
import DeliveryTracking from '@/components/delivery-tracking';

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Tracking</h1>
          <p className="text-gray-600 mt-2">
            Track delivery routes and manage real-time shipments
          </p>
        </div>

        <DeliveryTracking />
      </main>
    </>
  );
}
