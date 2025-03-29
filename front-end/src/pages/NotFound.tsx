export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-4">
            The URL you're trying to access doesn't exist. Please use the correct format:
          </p>
          <p className="text-gray-600">
            Try visiting:{' '}
            <a 
              href="/welcome/399d58ea-bcac-40fa-8112-c7d8ab6914cf" 
              className="text-blue-500 hover:text-blue-700 underline"
            >
              /welcome/399d58ea-bcac-40fa-8112-c7d8ab6914cf
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 