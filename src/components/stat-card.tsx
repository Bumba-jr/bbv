interface StatCardProps {
  title: string;
  value: string;
  badge: string;
  animate?: string;
  delay?: string;
  isNumeric?: boolean;
}

export default function StatCard({
  title,
  value,
  badge,
  animate = 'scale',
  delay = '0ms',
  isNumeric = false,
}: StatCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-48 overflow-hidden"
      data-animate={animate}
      style={{ '--delay': delay } as React.CSSProperties}
    >
      <div>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {title}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 inline-block w-fit">
            {badge}
          </div>
        </div>
      </div>
      {!isNumeric && (
        <div className="h-16 w-full relative">
          <canvas id={`chart-${title.replace(/\s+/g, '-').toLowerCase()}`}></canvas>
        </div>
      )}
    </div>
  );
}
