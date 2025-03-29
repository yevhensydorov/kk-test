export function ValidationError({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="text-center">
          <p className="text-red-500 mb-4">{message}</p>
          <p className="text-gray-600 text-sm mb-4">
            Example of a valid UUID format: 123e4567-e89b-12d3-a456-426614174000
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