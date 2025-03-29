import { useParams } from 'react-router-dom';
import { useDeliveryMessage } from '../services/api';
import { Loading } from '../components/Loading';
import { ValidationError } from '../components/errors/ValidationError';
import { NotFoundError } from '../components/errors/NotFoundError';
import { GeneralError } from '../components/errors/GeneralError';

export function Welcome() {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, error } = useDeliveryMessage(userId || '');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    const errorMessage = error instanceof Error 
      ? (error as any).response?.data?.message || error.message 
      : 'Error loading message';
    const isValidationError = errorMessage.includes('Invalid user ID format');
    const isNotFoundError = errorMessage.includes('User not found');

    if (isValidationError) {
      return <ValidationError message={errorMessage} />;
    }

    if (isNotFoundError) {
      return <NotFoundError message={errorMessage} />;
    }

    return <GeneralError message={errorMessage} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="relative">
        {/* Mobile Cat Image */}
        <div className="sm:hidden absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="/cat.svg" 
              alt="Happy Cat" 
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden sm:pt-0 pt-20">
          <div className="flex flex-col sm:flex-row">
            {/* Desktop Cat Image */}
            <div className="hidden sm:block w-1/3 bg-gray-100 relative min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src="/cat.svg" 
                  alt="Happy Cat" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1">
              {/* Header Section */}
              <div className="p-6 pt-10 sm:pt-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">{data?.title}</h1>
              </div>

              {/* Main Content */}
              <div className="p-6">
                {/* Message Section */}
                <div className="mb-6">
                  <p className="text-gray-600 whitespace-pre-wrap text-center sm:text-left">{data?.message}</p>
                </div>

                {/* Price and Gift Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                  <div className="w-full sm:w-auto text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Price</h2>
                    <p className="text-2xl font-bold text-gray-800">£{data?.totalPrice.toFixed(2)}</p>
                  </div>

                  {data?.freeGift && (
                    <div className="w-full sm:w-auto bg-green-100 text-green-800 px-6 py-3 rounded-lg text-center">
                      <p className="font-semibold flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-xl">🎁</span>
                        <span>Free Gift Included!</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center sm:justify-start gap-4 mt-6 mb-6">
                  <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors uppercase text-sm font-medium">
                    See details
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors uppercase text-sm font-medium">
                    Edit delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 