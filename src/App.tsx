import { Navigate, Route, Routes } from 'react-router-dom';
import AppProvider from './providers';
import AppRouter from './routes';
import { useToggleLogin } from './store/useToogleLogin';
import SignInPage from './pages/auth/register';
import LoginPage from './pages/auth/login';

export default function App() {
  const { login } = useToggleLogin();

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
