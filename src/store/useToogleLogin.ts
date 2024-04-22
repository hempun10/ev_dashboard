import { create } from 'zustand';

type State = {
  login: boolean;
  toggleLogin: (state: boolean) => void;
};

export const useToggleLogin = create<State>((set) => ({
  login: localStorage.getItem('ev_token') ? true : false,
  toggleLogin: (state) => set({ login: state })
}));
