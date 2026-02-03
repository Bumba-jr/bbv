'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import StatCard from '@/components/stat-card';
import RevenueChart from '@/components/revenue-chart';
import ExpensesChart from '@/components/expenses-chart';
import ServicePopularity from '@/components/service-popularity';
import PaymentStatus from '@/components/payment-status';
import CustomerHistory from '@/components/customer-history';
import OrderForm from '@/components/order-form';
import PageLoader from '@/components/page-loader';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todayRevenue: '₦0.00',
    monthRevenue: '₦0.00',
    yearRevenue: '₦0.00',
    totalCustomers: 0,
    todayProfit: '₦0.00',
    todayExpenses: '₦0.00',
    monthExpenses: '₦0.00',
    lifetimeExpenses: '₦0.00',
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isVisible={isLoading} />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Revenue"
            value={stats.todayRevenue}
            badge="Today"
            animate="scale"
            delay="0ms"
          />
          <StatCard
            title="This Month Revenue"
            value={stats.monthRevenue}
            badge="This Month"
            animate="scale"
            delay="80ms"
          />
          <StatCard
            title="Yearly Revenue"
            value={stats.yearRevenue}
            badge="This Year"
            animate="scale"
            delay="160ms"
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toString()}
            badge="Lifetime"
            animate="scale"
            delay="240ms"
            isNumeric
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Profit"
            value={stats.todayProfit}
            badge="Calculating..."
            animate="fade-up"
            delay="0ms"
          />
          <StatCard
            title="Today's Expenses"
            value={stats.todayExpenses}
            badge="vs yesterday"
            animate="fade-up"
            delay="80ms"
          />
          <StatCard
            title="This Month's Expenses"
            value={stats.monthExpenses}
            badge="vs last month"
            animate="fade-up"
            delay="160ms"
          />
          <StatCard
            title="Lifetime Expenses"
            value={stats.lifetimeExpenses}
            badge="All-time total"
            animate="fade-up"
            delay="240ms"
          />
        </div>

        {/* Quick Actions Section */}
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
          style={{ '--delay': '50ms' } as React.CSSProperties}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Quick Order Management</h3>
              <p className="text-blue-100 text-sm">Streamline your order process with our enhanced tools</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/new-order"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <i className="fas fa-plus-circle"></i>
                Full Order Form
              </Link>
              <Link
                href="/all-orders"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <i className="fas fa-list-alt"></i>
                All Orders
              </Link>
              <Link
                href="/customer-portal"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <i className="fas fa-users"></i>
                Customer Portal
              </Link>
              <Link
                href="/payment-reports"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <i className="fas fa-credit-card"></i>
                Payment Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart type="weekly" />
          <RevenueChart type="yearly" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensesChart type="weekly" />
          <ExpensesChart type="yearly" />
        </div>

        {/* Service Popularity */}
        <ServicePopularity />

        {/* Payment Status */}
        <PaymentStatus />

        {/* Customer History */}
        <CustomerHistory />

        {/* Order Form Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <OrderForm />
          </div>
        </div>
      </main>
    </>
  );
}
