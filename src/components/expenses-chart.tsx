'use client';

interface ExpensesChartProps {
  type: 'weekly' | 'yearly';
}

export default function ExpensesChart({ type }: ExpensesChartProps) {
  const isWeekly = type === 'weekly';
  const title = isWeekly ? 'Weekly Expenses' : 'Yearly Expenses';
  const subtitle = isWeekly ? '₦0.00 this week' : '₦0.00 this year';

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      data-animate={isWeekly ? 'fade-right' : 'fade-left'}
      style={isWeekly ? {} : { '--delay': '60ms' } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="bar-container" id={`${type}-expenses-chart`}>
        {/* Chart content will be rendered here */}
      </div>
    </div>
  );
}
