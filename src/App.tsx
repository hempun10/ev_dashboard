import { Navigate, Route, Routes } from 'react-router-dom';
import AppProvider from './providers';
import AppRouter from './routes';
import { useToggleLogin } from './store/useToogleLogin';
import SignInPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import { useUserDetails } from './store/useUserDetails';
import React from 'react';

export default function App() {
  const { login } = useToggleLogin();
  const { setUserDetails } = useUserDetails();

  React.useEffect(() => {
    const userDetails = localStorage.getItem('ev_userdetails');
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
    }
  }, [setUserDetails]);

  return (
    <AppProvider>
      {login ? (
        <AppRouter />
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignInPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </AppProvider>
  );
}
