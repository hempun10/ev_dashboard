import { create } from 'zustand';

interface LogoutState {
  logout: () => void;
}

export const useLogout = create<LogoutState>((set) => ({
  logout: () => {
    // Clear the user's session
    localStorage.removeItem('ev_token');
    // Redirect to the login page
    window.location.href = '/login';
  }
}));
