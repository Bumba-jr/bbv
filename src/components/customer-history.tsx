'use client';

import { useState } from 'react';

export default function CustomerHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState<any[]>([]);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      data-animate="fade-up"
      style={{ '--delay': '200ms' } as React.CSSProperties}
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">Customer History</h3>
            <p className="text-xs text-gray-500 mt-1">View past orders and customer loyalty</p>
          </div>
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-gray-50">
            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-3 font-medium cursor-pointer hover:bg-gray-100">
                Customer Name <i className="fas fa-sort text-gray-300 ml-1"></i>
              </th>
              <th className="px-6 py-3 font-medium">Phone</th>
              <th className="px-6 py-3 font-medium text-center cursor-pointer hover:bg-gray-100">
                Total Orders <i className="fas fa-sort text-gray-300 ml-1"></i>
              </th>
              <th className="px-6 py-3 font-medium text-right cursor-pointer hover:bg-gray-100">
                Total Spent <i className="fas fa-sort text-gray-300 ml-1"></i>
              </th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <i className="fas fa-inbox text-2xl mb-2"></i>
                  <p>No customers found</p>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4 text-center">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-right">{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">Showing {customers.length} of {customers.length}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-3 py-1 text-xs text-gray-600">Page {currentPage} of 1</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs disabled:opacity-50"
            disabled={customers.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
