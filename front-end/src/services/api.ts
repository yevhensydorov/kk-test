import { useQuery } from '@tanstack/react-query';
import type { DeliveryMessage } from '../types/dto';

const fetchDeliveryMessage = async (userId: string): Promise<DeliveryMessage> => {
  const response = await fetch(`http://localhost:3000/comms/your-next-delivery/${userId}`);
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found. Please check the ID and try again.');
    } else if (response.status === 400) {
      throw new Error(data.message);
    }
    throw new Error('Failed to fetch delivery message');
  }
  
  return data;
};

export const useDeliveryMessage = (userId: string) => {
  return useQuery({
    queryKey: ['next-delivery', userId],
    queryFn: () => fetchDeliveryMessage(userId),
    retry: false,
  });
}; 