export default function LoadingFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading 3D scene...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
      </div>
    </div>
  )
}
