import { baseUrl } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useChargers = () => {
  return useQuery({
    queryKey: ['chargers'],
    queryFn: async () => {
      const res = await axios.get(baseUrl + '/chagers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ev_token')}`
        }
      });
      return res.data;
    }
  });
};
