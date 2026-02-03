'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock, Package } from 'lucide-react';

interface DeliveryStop {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  phone: string;
  status: 'pending' | 'in-transit' | 'delivered';
  scheduledTime: string;
  actualTime?: string;
  items: number;
}

interface DeliveryRoute {
  id: string;
  routeNumber: string;
  driver: string;
  date: string;
  stops: DeliveryStop[];
  status: 'pending' | 'in-progress' | 'completed';
}

const initialRoutes: DeliveryRoute[] = [
  {
    id: '1',
    routeNumber: 'ROUTE-001',
    driver: 'Ahmed Hassan',
    date: '2024-01-20',
    status: 'in-progress',
    stops: [
      {
        id: '1',
        orderId: 'ORD-001',
        customerName: 'Sarah Johnson',
        address: '123 Main St, Downtown',
        phone: '+1 (555) 123-4567',
        status: 'delivered',
        scheduledTime: '09:00 AM',
        actualTime: '09:15 AM',
        items: 5,
      },
      {
        id: '2',
        orderId: 'ORD-002',
        customerName: 'Michael Brown',
        address: '456 Oak Ave, Midtown',
        phone: '+1 (555) 234-5678',
        status: 'in-transit',
        scheduledTime: '10:30 AM',
        items: 3,
      },
      {
        id: '3',
        orderId: 'ORD-003',
        customerName: 'Emily Davis',
        address: '789 Pine Rd, Uptown',
        phone: '+1 (555) 345-6789',
        status: 'pending',
        scheduledTime: '11:45 AM',
        items: 7,
      },
    ],
  },
  {
    id: '2',
    routeNumber: 'ROUTE-002',
    driver: 'Fatima Ali',
    date: '2024-01-20',
    status: 'pending',
    stops: [
      {
        id: '4',
        orderId: 'ORD-004',
        customerName: 'James Wilson',
        address: '321 Elm St, Westside',
        phone: '+1 (555) 456-7890',
        status: 'pending',
        scheduledTime: '02:00 PM',
        items: 4,
      },
      {
        id: '5',
        orderId: 'ORD-005',
        customerName: 'Lisa Martinez',
        address: '654 Birch Ln, Eastside',
        phone: '+1 (555) 567-8901',
        status: 'pending',
        scheduledTime: '03:15 PM',
        items: 6,
      },
    ],
  },
];

export default function DeliveryTracking() {
  const [routes, setRoutes] = useState<DeliveryRoute[]>(initialRoutes);
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<DeliveryStop | null>(null);

  const updateStopStatus = (routeId: string, stopId: string, newStatus: DeliveryStop['status']) => {
    setRoutes(
      routes.map((route) =>
        route.id === routeId
          ? {
              ...route,
              stops: route.stops.map((stop) =>
                stop.id === stopId
                  ? {
                      ...stop,
                      status: newStatus,
                      actualTime: newStatus === 'delivered' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : stop.actualTime,
                    }
                  : stop
              ),
            }
          : route
      )
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-800',
      'in-transit': 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || colors.pending;
  };

  const getProgressPercentage = (route: DeliveryRoute) => {
    const deliveredCount = route.stops.filter((s) => s.status === 'delivered').length;
    return Math.round((deliveredCount / route.stops.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Delivery Tracking</h2>
        <p className="text-gray-600 mt-1">Manage and track all delivery routes in real-time</p>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            {/* Route Header */}
            <div
              onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)}
              className="p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{route.routeNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(route.status)}`}>
                      {route.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Driver</p>
                      <p className="font-semibold text-gray-900">{route.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date</p>
                      <p className="font-semibold text-gray-900">{route.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Stops</p>
                      <p className="font-semibold text-gray-900">
                        {route.stops.length} stops ({getProgressPercentage(route)}% complete)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Progress</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(route)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Route Details - Expanded */}
            {expandedRoute === route.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-4">Delivery Stops</h4>
                <div className="space-y-4">
                  {route.stops.map((stop, index) => (
                    <div
                      key={stop.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{stop.customerName}</p>
                            <p className="text-sm text-gray-600 mt-1">Order: {stop.orderId}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(stop.status)}`}>
                          {stop.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-sm">{stop.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-green-500" />
                          <a href={`tel:${stop.phone}`} className="text-sm hover:text-blue-600">
                            {stop.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">
                            Scheduled: {stop.scheduledTime}
                            {stop.actualTime && ` | Delivered: ${stop.actualTime}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Package className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">{stop.items} items</span>
                        </div>
                      </div>

                      {/* Status Update Buttons */}
                      {stop.status !== 'delivered' && (
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          {stop.status === 'pending' && (
                            <button
                              onClick={() => updateStopStatus(route.id, stop.id, 'in-transit')}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition"
                            >
                              Start Delivery
                            </button>
                          )}
                          {stop.status === 'in-transit' && (
                            <button
                              onClick={() => updateStopStatus(route.id, stop.id, 'delivered')}
                              className="flex-1 px-3 py-2 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition"
                            >
                              Mark Delivered
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedStop(stop)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition"
                          >
                            Details
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stop Details Modal */}
      {selectedStop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Stop Details</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Customer</p>
                <p className="font-semibold text-gray-900">{selectedStop.customerName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-semibold text-gray-900">{selectedStop.orderId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="font-semibold text-gray-900">{selectedStop.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <a href={`tel:${selectedStop.phone}`} className="font-semibold text-blue-600 hover:text-blue-700">
                  {selectedStop.phone}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Items</p>
                <p className="font-semibold text-gray-900">{selectedStop.items} items</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Scheduled Time</p>
                <p className="font-semibold text-gray-900">{selectedStop.scheduledTime}</p>
              </div>

              {selectedStop.actualTime && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivered Time</p>
                  <p className="font-semibold text-green-600">{selectedStop.actualTime}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    selectedStop.status
                  )}`}
                >
                  {selectedStop.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStop(null)}
              className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
