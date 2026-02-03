'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Download, Eye, X } from 'lucide-react';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes: string;
}

export default function InvoiceSystem() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'John Doe',
      customerPhone: '555-1234',
      customerEmail: 'john@example.com',
      items: [
        { description: 'Dry Cleaning - Shirts', quantity: 5, price: 15 },
        { description: 'Dry Cleaning - Pants', quantity: 3, price: 20 },
      ],
      subtotal: 135,
      tax: 13.5,
      total: 148.5,
      date: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'paid',
      notes: 'Thank you for your business!',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    notes: '',
  });

  const handleAddItem = () => {
    const currentItems = (formData.items || []) as InvoiceItem[];
    setFormData({
      ...formData,
      items: [...currentItems, { description: '', quantity: 1, price: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = (formData.items || []) as InvoiceItem[];
    const newItems = currentItems.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const currentItems = (formData.items || []) as InvoiceItem[];
    const newItems = [...currentItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const calculateTotals = () => {
    const currentItems = (formData.items || []) as InvoiceItem[];
    const subtotal = currentItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const tax = subtotal * 0.1; // 10% tax
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleSaveInvoice = () => {
    if (!formData.customerName || !formData.customerEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { subtotal, tax, total } = calculateTotals();
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: formData.invoiceNumber || `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      customerName: formData.customerName || '',
      customerPhone: formData.customerPhone || '',
      customerEmail: formData.customerEmail || '',
      items: (formData.items as InvoiceItem[]) || [],
      subtotal,
      tax,
      total,
      date: formData.date || new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate || '',
      status: (formData.status as any) || 'draft',
      notes: formData.notes || '',
    };

    setInvoices([...invoices, newInvoice]);
    toast.success('Invoice created successfully!');
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      subtotal: 0,
      tax: 0,
      total: 0,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'draft',
      notes: '',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.draft;
  };

  const currentTotals = calculateTotals();

  const previewInvoice = invoices.find((inv) => inv.id === showPreview);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoice Management</h2>
          <p className="text-gray-600 mt-1">Total Invoices: {invoices.length}</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Create Invoice
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{invoice.customerName}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">
                    ${invoice.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowPreview(invoice.id)}
                        className="text-blue-600 hover:text-blue-700 transition"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          toast.success('Invoice downloaded as PDF');
                        }}
                        className="text-green-600 hover:text-green-700 transition"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Create New Invoice</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Customer Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Customer Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName || ''}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail || ''}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.customerPhone || ''}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice #
                    </label>
                    <input
                      type="text"
                      value={formData.invoiceNumber || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Line Items</h4>
                <div className="space-y-3">
                  {(formData.items as InvoiceItem[])?.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="col-span-6 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                        className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="col-span-2 text-red-600 hover:text-red-700 font-medium transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddItem}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  + Add Item
                </button>
              </div>

              {/* Totals */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-2 text-right">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-medium">${currentTotals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tax (10%):</span>
                    <span className="font-medium">${currentTotals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-blue-600">${currentTotals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes or terms..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveInvoice}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Invoice {previewInvoice.invoiceNumber}</h3>
              <button
                onClick={() => setShowPreview(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-600 text-sm mb-1">Customer</h4>
                  <p className="font-semibold">{previewInvoice.customerName}</p>
                  <p className="text-sm text-gray-600">{previewInvoice.customerEmail}</p>
                  <p className="text-sm text-gray-600">{previewInvoice.customerPhone}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-gray-600 text-sm mb-1">Invoice Details</h4>
                  <p className="font-semibold">{previewInvoice.invoiceNumber}</p>
                  <p className="text-sm text-gray-600">Date: {previewInvoice.date}</p>
                  <p className="text-sm text-gray-600">Due: {previewInvoice.dueDate}</p>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 font-semibold">Description</th>
                    <th className="text-center py-2 font-semibold">Qty</th>
                    <th className="text-right py-2 font-semibold">Price</th>
                    <th className="text-right py-2 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {previewInvoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">${item.price.toFixed(2)}</td>
                      <td className="text-right font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-48">
                  <div className="flex justify-between py-2 border-b-2 border-gray-300">
                    <span>Subtotal:</span>
                    <span>${previewInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span>Tax:</span>
                    <span>${previewInvoice.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total:</span>
                    <span>${previewInvoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {previewInvoice.notes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-700">{previewInvoice.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPreview(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success('Invoice downloaded as PDF');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
