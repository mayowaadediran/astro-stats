export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
