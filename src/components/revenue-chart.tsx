'use client';

interface RevenueChartProps {
  type: 'weekly' | 'yearly';
}

export default function RevenueChart({ type }: RevenueChartProps) {
  const isWeekly = type === 'weekly';
  const title = isWeekly ? 'Weekly Revenue' : 'Yearly Revenue Overview';
  const subtitle = isWeekly ? '₦0.00 this week' : '₦0.00 this year';

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      data-animate={isWeekly ? 'fade-right' : 'fade-left'}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="bar-container">
        <div className="chart-grid-line" style={{ bottom: '25%' }}></div>
        <div className="chart-grid-line" style={{ bottom: '50%' }}></div>
        <div className="chart-grid-line" style={{ bottom: '75%' }}></div>
      </div>
    </div>
  );
}
