'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    PlusCircleIcon,
    UsersIcon,
    CreditCardIcon,
    ChartBarIcon,
    ShoppingBagIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/img/blue-logo.png" alt="Logo" className="w-8 h-8" />
                        <h1 className="font-bold text-xl tracking-tight text-blue-600">Laundry Management</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/new-order" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                            <PlusCircleIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">New Order</span>
                        </Link>
                        <Link href="/customer-portal" className="text-gray-600 hover:text-blue-600 transition">
                            <UsersIcon className="w-5 h-5" />
                        </Link>
                        <Link href="/payment-reports" className="text-gray-600 hover:text-blue-600 transition">
                            <CreditCardIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Quick Actions Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
                >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-3">Order Management Hub</h2>
                            <p className="text-blue-100 text-lg max-w-2xl">
                                Streamline your laundry business with our comprehensive order management system.
                                Create orders, track progress, and manage customer relationships all in one place.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/new-order"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-3 shadow-lg"
                            >
                                <PlusCircleIcon className="w-5 h-5" />
                                Place New Order
                            </Link>
                            <Link
                                href="/customer-portal"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-3 border border-white/20"
                            >
                                <UsersIcon className="w-5 h-5" />
                                Customer Portal
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Order Form</h3>
                        <p className="text-gray-600 mb-4">
                            Full-featured order creation with customer details, service selection, pickup scheduling, and payment processing.
                        </p>
                        <Link
                            href="/new-order"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Get Started
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <UsersIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Portal</h3>
                        <p className="text-gray-600 mb-4">
                            Allow customers to place orders, track status, view history, and manage their account independently.
                        </p>
                        <Link
                            href="/customer-portal"
                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                        >
                            View Portal
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <ChartBarIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
                        <p className="text-gray-600 mb-4">
                            Track business performance with detailed analytics, payment reports, and customer insights.
                        </p>
                        <Link
                            href="/payment-reports"
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                        >
                            View Reports
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* Order Process Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">How It Works</h3>
                        <p className="text-gray-600">Simple steps to manage your laundry orders efficiently</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Create Order</h4>
                            <p className="text-sm text-gray-600">Enter customer details and select services</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">2</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Schedule Pickup</h4>
                            <p className="text-sm text-gray-600">Set pickup date and time preferences</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-purple-600">3</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Process Order</h4>
                            <p className="text-sm text-gray-600">Track order status and processing</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-orange-600">4</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Complete & Deliver</h4>
                            <p className="text-sm text-gray-600">Process payment and deliver to customer</p>
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center py-12"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Transform your laundry business with our comprehensive order management system.
                        Start creating orders and managing customers today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/new-order"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3 shadow-lg"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            Create Your First Order
                        </Link>
                        <Link
                            href="/customer-portal"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3"
                        >
                            <UsersIcon className="w-5 h-5" />
                            Explore Customer Portal
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}