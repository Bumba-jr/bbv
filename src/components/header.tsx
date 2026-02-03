'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useYearCarousel } from '@/hooks/use-year-carousel';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { currentYear, changeYear } = useYearCarousel();
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src="/assets/img/blue-logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="font-bold text-xl tracking-tight text-blue-600" id="headerBusinessName">
            Laundry Management
          </h1>
        </div>

        {/* Year Carousel Navigation */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
          <button
            onClick={() => changeYear(-1)}
            className="year-carousel-btn p-1 text-gray-400 hover:text-blue-600 transition"
            title="Previous Year"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          <div className="flex items-center gap-2 min-w-[120px] justify-center">
            <i className="fas fa-calendar-alt text-blue-600 text-sm"></i>
            <span className="font-semibold text-gray-900 text-lg">{currentYear}</span>
          </div>
          <button
            onClick={() => changeYear(1)}
            className="year-carousel-btn p-1 text-gray-400 hover:text-blue-600 transition"
            title="Next Year"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-5">
          {/* New Order Quick Access */}
          <Link
            href="/new-order"
            className="text-gray-400 hover:text-blue-600 transition flex items-center gap-2"
            title="Place New Order"
          >
            <i className="fas fa-plus-circle text-lg"></i>
            <span className="hidden sm:inline text-sm font-medium">New Order</span>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-400 hover:text-blue-600 transition relative"
              title="Notifications"
            >
              <i className="fas fa-bell text-lg"></i>
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-2xl border border-gray-100 w-80 max-h-96 overflow-y-auto z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button
                      onClick={clearAllNotifications}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="p-4 text-sm text-gray-600">
                        {notif.message}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Payment Reports */}
          <Link
            href="/payment-reports"
            className="text-gray-400 hover:text-blue-600 transition"
            title="Payment Reports"
          >
            <i className="fas fa-credit-card text-lg"></i>
          </Link>

          {/* All Orders */}
          <Link
            href="/all-orders"
            className="text-gray-400 hover:text-blue-600 transition"
            title="All Orders"
          >
            <i className="fas fa-list-alt text-lg"></i>
          </Link>

          {/* Customer Portal */}
          <Link
            href="/customer-portal"
            className="text-gray-400 hover:text-blue-600 transition"
            title="Customer Portal"
          >
            <i className="fas fa-users text-lg"></i>
          </Link>

          <div className="text-sm text-gray-500 hidden sm:block" id="backupTime">
            Last sync: Just now
          </div>

          {/* Settings */}
          <Link
            href="/settings"
            className="text-gray-400 hover:text-blue-600 transition"
            title="Settings"
          >
            <i className="fas fa-cog text-lg"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
