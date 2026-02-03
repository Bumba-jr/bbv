'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function OrderForm() {
  const [entryMode, setEntryMode] = useState<'new' | 'old'>('new');
  const [formData, setFormData] = useState({
    custName: '',
    custPhone: '',
    custAddr: '',
    pickupAddress: '',
    pickupDate: '',
    pickupTime: '',
    items: [] as any[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.custName.trim()) {
      toast.error('Customer name is required');
      return;
    }
    toast.success('Order saved successfully');
    setFormData({
      custName: '',
      custPhone: '',
      custAddr: '',
      pickupAddress: '',
      pickupDate: '',
      pickupTime: '',
      items: [],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Place New Order</h3>
            <p className="text-xs text-gray-500 mt-1">Complete order management system</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Entry Mode Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Entry Mode</p>
            <p className="text-[11px] text-gray-500">Choose if this order is for today or a previous date</p>
          </div>
          <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden text-xs font-medium">
            <button
              type="button"
              onClick={() => setEntryMode('new')}
              className={`px-3 py-1 transition ${
                entryMode === 'new' ? 'bg-gray-900 text-white' : 'text-gray-600'
              }`}
            >
              New Data
            </button>
            <button
              type="button"
              onClick={() => setEntryMode('old')}
              className={`px-3 py-1 transition ${
                entryMode === 'old' ? 'bg-gray-900 text-white' : 'text-gray-600'
              }`}
            >
              Old Data
            </button>
          </div>
        </div>

        {/* Customer Information Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
              <i className="fas fa-user text-blue-600 text-xs"></i>
            </div>
            <h4 className="text-sm font-semibold text-gray-900">Customer Information</h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name *</label>
              <input
                type="text"
                id="custName"
                value={formData.custName}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="e.g. Musa Ibrahim"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                id="custPhone"
                value={formData.custPhone}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="e.g. +234 801 234 5678"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Customer Address *</label>
              <input
                type="text"
                id="custAddr"
                value={formData.custAddr}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="e.g. No 6 Barnawa"
                required
              />
            </div>
          </div>
        </div>

        {/* Pickup Details Section */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-2">
              <i className="fas fa-map-marker-alt text-green-600 text-xs"></i>
            </div>
            <h4 className="text-sm font-semibold text-gray-900">Pickup Details</h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Pickup Address</label>
              <input
                type="text"
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Leave empty to use customer address"
              />
              <p className="text-[10px] text-gray-500 mt-1">If different from customer address</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Pickup Date</label>
                <input
                  type="date"
                  id="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time Window</label>
                <select
                  id="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8am-12pm)</option>
                  <option value="afternoon">Afternoon (12pm-5pm)</option>
                  <option value="evening">Evening (5pm-8pm)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Save Order
        </button>
      </form>
    </div>
  );
}
