'use client';

export default function PaymentStatus() {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      data-animate="fade-up"
      style={{ '--delay': '200ms' } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Payment Status Overview</h3>
          <p className="text-sm text-gray-500" id="paymentOverviewTotal">
            ₦0.00 total pending
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        id="paymentStatusChart"
      >
        {/* Payment status bars will be rendered here */}
        <div className="text-center text-gray-500 py-8">
          <p className="text-sm">Loading payment data...</p>
        </div>
      </div>
    </div>
  );
}
