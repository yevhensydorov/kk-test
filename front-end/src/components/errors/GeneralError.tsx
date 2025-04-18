export function GeneralError({ message }: { message: string }) {
  console.log('GeneralError', message);
    return (
        <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
            <div className="text-center">
              <p className="text-red-500">Ooops something went wrong: {message}</p>
            </div>
          </div>
        </div>
      );
}
