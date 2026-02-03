'use client';

import Header from '@/components/header';
import AdvancedAnalytics from '@/components/advanced-analytics';

export default function AnalyticsPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive insights into your laundry business performance
          </p>
        </div>

        <AdvancedAnalytics />
      </main>
    </>
  );
}
