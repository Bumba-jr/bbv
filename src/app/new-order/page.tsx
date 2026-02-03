'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import OrderForm from '@/components/order-form';
import { toast } from 'sonner';

export default function NewOrderPage() {
  const [items, setItems] = useState<Array<{ description: string; price: number; qty: number }>>([]);
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQty, setItemQty] = useState('1');

  const addItem = () => {
    if (!itemDescription || !itemPrice) {
      toast.error('Please fill in all item fields');
      return;
    }

    const newItem = {
      description: itemDescription,
      price: parseFloat(itemPrice),
      qty: parseInt(itemQty),
    };

    setItems([...items, newItem]);
    setItemDescription('');
    setItemPrice('');
    setItemQty('1');
    toast.success('Item added');
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    toast.success('Item removed');
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Place New Order</h1>
          <p className="text-gray-600 mt-2">Create and manage new laundry orders with all details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <OrderForm />

            {/* Items Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Items</h3>

              {/* Add Item Form */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Item Description</label>
                    <input
                      type="text"
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Shirt Wash"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Price (₦)</label>
                      <input
                        type="number"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={itemQty}
                        onChange={(e) => setItemQty(e.target.value)}
                        min="1"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addItem}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add Item
                  </button>
                </div>
              </div>

              {/* Items List */}
              {items.length > 0 ? (
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.description}</p>
                        <p className="text-xs text-gray-500">
                          ₦{item.price.toFixed(2)} × {item.qty} = ₦{(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-4 text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-blue-600">₦{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <i className="fas fa-inbox text-2xl mb-2"></i>
                  <p className="text-sm">No items added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 h-fit lg:sticky lg:top-20 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Items:</span>
                  <span className="text-sm font-medium text-gray-900">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <span className="text-lg font-bold text-blue-600">₦{totalPrice.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                    Complete Order
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-3 text-sm">Quick Tips</h4>
              <ul className="space-y-2 text-xs text-blue-800">
                <li>• Fill in customer info first</li>
                <li>• Set pickup date and time</li>
                <li>• Add items with quantities</li>
                <li>• Review total before completing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
