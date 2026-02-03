'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import StatCard from '@/components/stat-card';
import PageLoader from '@/components/page-loader';
import { TrendingUp, Package, Users, Zap } from 'lucide-react';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const quickStats = [
    { title: "Today's Revenue", value: '$2,450.00', badge: 'Today', color: 'blue' },
    { title: 'Pending Orders', value: '24', badge: 'Active', color: 'orange' },
    { title: 'Total Customers', value: '1,247', badge: 'Lifetime', color: 'green' },
    { title: 'Loyalty Points', value: '15.2K', badge: 'Issued', color: 'purple' },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Comprehensive business insights and real-time reporting',
      link: '/analytics',
      color: 'blue',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track supplies, low stock alerts, and reorder management',
      link: '/inventory',
      color: 'green',
    },
    {
      icon: Zap,
      title: 'Invoice System',
      description: 'Create, manage, and automate invoices and receipts',
      link: '/invoices',
      color: 'yellow',
    },
    {
      icon: Package,
      title: 'Delivery Tracking',
      description: 'Real-time delivery route management and tracking',
      link: '/delivery',
      color: 'red',
    },
    {
      icon: Users,
      title: 'Loyalty Program',
      description: 'Customer rewards and retention programs',
      link: '/loyalty',
      color: 'purple',
    },
    {
      icon: TrendingUp,
      title: 'Reports & Export',
      description: 'Generate comprehensive reports and export data',
      link: '/payment-reports',
      color: 'indigo',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      status: 'Ready',
      amount: '$156.00',
      date: '2024-01-20',
    },
    {
      id: 'ORD-002',
      customer: 'Michael Brown',
      status: 'Processing',
      amount: '$89.50',
      date: '2024-01-20',
    },
    {
      id: 'ORD-003',
      customer: 'Emily Davis',
      status: 'Pending',
      amount: '$234.00',
      date: '2024-01-19',
    },
    {
      id: 'ORD-004',
      customer: 'James Wilson',
      status: 'Delivered',
      amount: '$145.00',
      date: '2024-01-19',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Ready': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Delivered': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors['Pending'];
  };

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <PageLoader isVisible={isLoading} />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your business overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              badge={stat.badge}
              animate="scale"
            />
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link href="/all-orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="group bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-l-4 border-gray-200 hover:border-blue-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getIconColor(feature.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl text-gray-300 group-hover:text-blue-100 transition">→</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Start Managing More Efficiently</h3>
              <p className="text-blue-100">
                Explore all the advanced features to streamline your laundry business operations
              </p>
            </div>
            <Link
              href="/new-order"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap"
            >
              Create New Order
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
