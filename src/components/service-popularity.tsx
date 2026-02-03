'use client';

import { useState } from 'react';

export default function ServicePopularity() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden service-popularity-container"
      data-animate="fade-up"
      style={{ '--delay': '100ms' } as React.CSSProperties}
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">Service Popularity</h3>
            <p className="text-xs text-gray-500 mt-1">
              Top 6 services by number of orders in the selected date range.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
          >
            <i className={`fas fa-refresh mr-1 ${isLoading ? 'animate-spin' : ''}`}></i>
            Refresh
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="h-64 md:h-80 relative">
          <canvas id="servicePopularityChart"></canvas>
        </div>
        <div id="servicePopularityList" className="space-y-3 text-sm">
          <div className="text-center text-gray-500 py-8">
            <i className="fas fa-chart-pie text-2xl mb-2"></i>
            <p>Loading service data...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
