interface PageLoaderProps {
  isVisible: boolean;
}

export default function PageLoader({ isVisible }: PageLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-100 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-8 shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <div className="spinner border-4 border-gray-200 border-t-blue-600 rounded-full w-10 h-10 animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-gray-900">Syncing data...</p>
        <p className="text-xs text-gray-500 mt-1">Please wait while we load your dashboard.</p>
      </div>
    </div>
  );
}
