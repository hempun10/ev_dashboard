import { UserDetails } from '@/types/user';
import { create } from 'zustand';

type State = {
  userDetails: UserDetails;
  setUserDetails: (userDetails: UserDetails) => void;
};

export const useUserDetails = create<State>((set) => ({
  userDetails: {} as UserDetails,
  setUserDetails: (userDetails) => set({ userDetails })
}));
