'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Edit2, Trash2, Plus, AlertCircle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  unit: string;
  supplier: string;
  lastRestocked: string;
}

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Detergent Powder',
    category: 'Chemicals',
    quantity: 150,
    reorderLevel: 50,
    unit: 'kg',
    supplier: 'ChemSupply Co',
    lastRestocked: '2024-01-15',
  },
  {
    id: '2',
    name: 'Fabric Softener',
    category: 'Chemicals',
    quantity: 45,
    reorderLevel: 30,
    unit: 'L',
    supplier: 'ChemSupply Co',
    lastRestocked: '2024-01-10',
  },
  {
    id: '3',
    name: 'Bleach',
    category: 'Chemicals',
    quantity: 20,
    reorderLevel: 25,
    unit: 'L',
    supplier: 'ChemSupply Co',
    lastRestocked: '2024-01-05',
  },
  {
    id: '4',
    name: 'Hangers',
    category: 'Equipment',
    quantity: 500,
    reorderLevel: 200,
    unit: 'pieces',
    supplier: 'Equipment Ltd',
    lastRestocked: '2023-12-20',
  },
  {
    id: '5',
    name: 'Plastic Bags',
    category: 'Packaging',
    quantity: 1000,
    reorderLevel: 500,
    unit: 'pieces',
    supplier: 'PackCo',
    lastRestocked: '2024-01-01',
  },
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [formData, setFormData] = useState<InventoryItem>({
    id: '',
    name: '',
    category: '',
    quantity: 0,
    reorderLevel: 0,
    unit: '',
    supplier: '',
    lastRestocked: new Date().toISOString().split('T')[0],
  });

  const categories = ['All', 'Chemicals', 'Equipment', 'Packaging', 'Other'];

  const filteredInventory =
    filterCategory === 'All'
      ? inventory
      : inventory.filter((item) => item.category === filterCategory);

  const lowStockItems = inventory.filter((item) => item.quantity <= item.reorderLevel);

  const handleAddItem = () => {
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      category: '',
      quantity: 0,
      reorderLevel: 0,
      unit: '',
      supplier: '',
      lastRestocked: new Date().toISOString().split('T')[0],
    });
    setShowForm(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingId(item.id);
    setFormData(item);
    setShowForm(true);
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setInventory(
        inventory.map((item) => (item.id === editingId ? formData : item))
      );
      toast.success('Inventory item updated');
    } else {
      setInventory([
        ...inventory,
        { ...formData, id: Date.now().toString() },
      ]);
      toast.success('Inventory item added');
    }

    setShowForm(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter((item) => item.id !== id));
      toast.success('Inventory item deleted');
    }
  };

  return (
    <div className="space-y-6">
      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Low Stock Alert</h3>
            <p className="text-sm text-red-700">
              {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} need reordering:
              {' '}
              {lowStockItems.map((item) => item.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Total Items: {inventory.length}</p>
        </div>
        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              {editingId ? 'Edit Item' : 'Add New Item'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Detergent Powder"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, reorderLevel: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., kg, L, pieces"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ChemSupply Co"
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
                onClick={handleSaveItem}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {editingId ? 'Update' : 'Add'} Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Reorder Level
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Last Restocked
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
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{item.reorderLevel}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{item.supplier}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{item.lastRestocked}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.quantity <= item.reorderLevel
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.quantity <= item.reorderLevel ? 'Low' : 'OK'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
