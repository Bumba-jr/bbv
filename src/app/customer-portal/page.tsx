'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

export default function CustomerPortalPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Customer Portal</h1>
          <p className="text-gray-600 mt-2">Manage and view all customer information and history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search customers by name or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Phone</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-700">Orders</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-700">Total Spent</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedCustomers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          <i className="fas fa-users text-2xl mb-2"></i>
                          <p>No customers found</p>
                        </td>
                      </tr>
                    ) : (
                      paginatedCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{customer.name}</td>
                          <td className="px-4 py-3 text-gray-600">{customer.phone}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{customer.totalOrders}</td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">
                            ₦{customer.totalSpent.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => setSelectedCustomer(customer)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-600">
                    Showing {paginatedCustomers.length} of {filteredCustomers.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50 disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="px-3 py-1 text-xs text-gray-600">
                      {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-200 rounded text-xs hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Details */}
          <div className="lg:col-span-1 h-fit lg:sticky lg:top-20">
            {selectedCustomer ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Customer Details</h3>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Name</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Address</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedCustomer.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Total Orders</label>
                      <p className="text-lg font-bold text-blue-600 mt-1">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Total Spent</label>
                      <p className="text-lg font-bold text-green-600 mt-1">₦{selectedCustomer.totalSpent.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Member Since</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                  <i className="fas fa-edit mr-2"></i>
                  Edit Customer
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500">
                <i className="fas fa-user-circle text-4xl mb-4"></i>
                <p className="text-sm">Select a customer to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
