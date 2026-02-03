'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    ArrowLeftIcon,
    PlusIcon,
    MinusIcon,
    ShoppingBagIcon,
    MapPinIcon,
    CalendarIcon,
    ClockIcon,
    DocumentTextIcon,
    ReceiptPercentIcon
} from '@heroicons/react/24/outline';
import { useServices } from '@/hooks/useFirestore';
import { addOrder } from '@/lib/firestore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Order, Service } from '@/types';

export default function NewOrderPage() {
    const [selectedServices, setSelectedServices] = useState<(Service & { quantity: number })[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [orderForm, setOrderForm] = useState({
        customerName: '',
        customerPhone: '',
        customerAddress: '',
        pickupAddress: '',
        pickupDate: '',
        pickupTime: '',
        specialInstructions: '',
        paymentMethod: 'cash' as 'cash' | 'card' | 'transfer' | 'mobile',
        paymentStatus: 'pending' as 'paid' | 'pending' | 'partial'
    });

    const { services, loading: servicesLoading } = useServices();

    // Filter services based on search
    const filteredServices = services.filter(service =>
        service.isActive && (
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Group services by category
    const servicesByCategory = filteredServices.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    const handleServiceToggle = (service: Service) => {
        const existing = selectedServices.find(s => s.id === service.id);
        if (existing) {
            setSelectedServices(selectedServices.filter(s => s.id !== service.id));
        } else {
            setSelectedServices([...selectedServices, { ...service, quantity: 1 }]);
        }
    };

    const updateServiceQuantity = (serviceId: string, quantity: number) => {
        if (quantity <= 0) {
            setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
            return;
        }

        setSelectedServices(selectedServices.map(s =>
            s.id === serviceId ? { ...s, quantity } : s
        ));
    };

    const calculateSubtotal = () => {
        return selectedServices.reduce((sum, service) => sum + (service.price * service.quantity), 0);
    };

    const calculateTax = () => {
        // Assuming 7.5% VAT (you can make this configurable)
        return calculateSubtotal() * 0.075;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedServices.length === 0) {
            toast.error('Please select at least one service');
            return;
        }

        if (!orderForm.customerName || !orderForm.customerPhone || !orderForm.customerAddress) {
            toast.error('Please fill in all customer details');
            return;
        }

        setIsSubmitting(true);
        try {
            const order: Omit<Order, 'id'> = {
                customer: {
                    name: orderForm.customerName,
                    phone: orderForm.customerPhone,
                    address: orderForm.customerAddress,
                },
                items: selectedServices.map(service => ({
                    description: service.name,
                    price: service.price,
                    quantity: service.quantity,
                })),
                totalAmount: calculateTotal(),
                paymentStatus: orderForm.paymentStatus,
                paymentMethod: orderForm.paymentMethod,
                timestamp: new Date(),
                status: 'pending',
                specialInstructions: orderForm.specialInstructions,
                pickupDate: orderForm.pickupDate ? new Date(orderForm.pickupDate) : undefined,
                pickupTime: orderForm.pickupTime,
                pickupAddress: orderForm.pickupAddress || orderForm.customerAddress,
            };

            await addOrder(order);
            toast.success('Order created successfully!');

            // Reset form
            setSelectedServices([]);
            setOrderForm({
                customerName: '',
                customerPhone: '',
                customerAddress: '',
                pickupAddress: '',
                pickupDate: '',
                pickupTime: '',
                specialInstructions: '',
                paymentMethod: 'cash',
                paymentStatus: 'pending'
            });

        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to create order');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/img/blue-logo.png" alt="Logo" className="w-8 h-8" />
                        <h1 className="font-bold text-xl tracking-tight text-primary-600">Place New Order</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-600 hover:text-primary-600 transition flex items-center gap-2">
                            <ArrowLeftIcon className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Customer Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                        <ShoppingBagIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={orderForm.customerName}
                                            onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            placeholder="Enter customer name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={orderForm.customerPhone}
                                            onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            placeholder="e.g. +234 801 234 5678"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer Address *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={orderForm.customerAddress}
                                            onChange={(e) => setOrderForm({ ...orderForm, customerAddress: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            placeholder="Enter customer address"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Pickup Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                        <MapPinIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Pickup Details</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pickup Address
                                        </label>
                                        <input
                                            type="text"
                                            value={orderForm.pickupAddress}
                                            onChange={(e) => setOrderForm({ ...orderForm, pickupAddress: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            placeholder="Leave empty to use customer address"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            If different from customer address
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pickup Date
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={orderForm.pickupDate}
                                                    onChange={(e) => setOrderForm({ ...orderForm, pickupDate: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                                />
                                                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Time Window
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={orderForm.pickupTime}
                                                    onChange={(e) => setOrderForm({ ...orderForm, pickupTime: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                                                >
                                                    <option value="">Select time window</option>
                                                    <option value="morning">Morning (8am - 12pm)</option>
                                                    <option value="afternoon">Afternoon (12pm - 5pm)</option>
                                                    <option value="evening">Evening (5pm - 8pm)</option>
                                                </select>
                                                <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Services Selection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                            <ReceiptPercentIcon className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900">Select Services</h2>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <span>{selectedServices.length} services selected</span>
                                    </div>
                                </div>

                                {/* Search Input */}
                                <div className="mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search services (e.g., shirt, shoes, dry cleaning...)"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {servicesLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <LoadingSpinner />
                                    </div>
                                ) : Object.keys(servicesByCategory).length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-600 text-lg font-medium">No services found</p>
                                        <p className="text-gray-500">Try different keywords or check your search term</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                                            <div key={category}>
                                                <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                                                    {category} Services
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {categoryServices.map((service) => {
                                                        const isSelected = selectedServices.some(s => s.id === service.id);
                                                        const selectedService = selectedServices.find(s => s.id === service.id);

                                                        return (
                                                            <div
                                                                key={service.id}
                                                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${isSelected
                                                                        ? 'border-primary-500 bg-primary-50 shadow-md'
                                                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                                                    }`}
                                                                onClick={() => handleServiceToggle(service)}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                                                    <span className="font-bold text-primary-600">₦{service.price.toFixed(2)}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-3">{service.description}</p>

                                                                {isSelected && (
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-sm text-gray-600">Quantity:</span>
                                                                        <div className="flex items-center gap-2">
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    updateServiceQuantity(service.id!, Math.max(0, (selectedService?.quantity || 1) - 1));
                                                                                }}
                                                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition"
                                                                            >
                                                                                <MinusIcon className="w-4 h-4" />
                                                                            </button>
                                                                            <span className="w-8 text-center font-medium">{selectedService?.quantity || 1}</span>
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    updateServiceQuantity(service.id!, (selectedService?.quantity || 1) + 1);
                                                                                }}
                                                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition"
                                                                            >
                                                                                <PlusIcon className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Payment & Special Instructions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                        <DocumentTextIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Payment Method
                                            </label>
                                            <select
                                                value={orderForm.paymentMethod}
                                                onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value as any })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            >
                                                <option value="cash">Cash</option>
                                                <option value="card">Card</option>
                                                <option value="transfer">Bank Transfer</option>
                                                <option value="mobile">Mobile Money</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Payment Status
                                            </label>
                                            <select
                                                value={orderForm.paymentStatus}
                                                onChange={(e) => setOrderForm({ ...orderForm, paymentStatus: e.target.value as any })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="partial">Partial Payment</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Special Instructions
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={orderForm.specialInstructions}
                                            onChange={(e) => setOrderForm({ ...orderForm, specialInstructions: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Any special care instructions, stain details, or notes..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <ReceiptPercentIcon className="w-5 h-5 text-primary-600" />
                                    </div>
                                </div>

                                {selectedServices.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <ShoppingBagIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                        <p>No services selected</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 mb-6">
                                        {selectedServices.map((service) => (
                                            <div key={service.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        ₦{service.price.toFixed(2)} × {service.quantity}
                                                    </p>
                                                </div>
                                                <span className="font-semibold text-gray-900 ml-4">
                                                    ₦{(service.price * service.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {selectedServices.length > 0 && (
                                    <div className="border-t border-gray-200 pt-4 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-900 font-medium">₦{calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax (7.5%)</span>
                                            <span className="text-gray-900 font-medium">₦{calculateTax().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Pickup & Delivery</span>
                                            <span className="text-green-600 font-medium">FREE</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-primary-600">₦{calculateTotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || selectedServices.length === 0}
                                    className="w-full mt-6 bg-primary-600 text-white py-4 px-6 rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-semibold"
                                >
                                    {isSubmitting && <LoadingSpinner size="sm" />}
                                    {isSubmitting ? 'Creating Order...' : 'Create Order'}
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}