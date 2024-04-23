import { baseUrl } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useStations = () => {
  return useQuery({
    queryKey: ['stations'],
    queryFn: async () => {
      const res = await axios.get(baseUrl + '/stations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ev_token')}`
        }
      });
      return res.data;
    }
  });
};
