import NotFound from '@/pages/not-found';
import { useUserDetails } from '@/store/useUserDetails';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const ChargersPage = lazy(() => import('@/pages/stations'));
const StationPage = lazy(() => import('@/pages/stations/index'));
const SettingsPage = lazy(() => import('@/pages/settings'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'chargers',
          element: <ChargersPage />
        },
        {
          path: 'stations',
          element: <StationPage />
        },
        {
          path: 'settings',
          element: <SettingsPage />
        }
      ]
    }
  ];

  // const publicRoutes = [
  //   {
  //     path: '/login',
  //     element: <SignInPage />,
  //     index: true
  //   },
  //   {
  //     path: '/register',
  //     element: <RegisterPage />,
  //     index: true
  //   },
  //   {
  //     path: '/404',
  //     element: <NotFound />
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />
  //   }
  // ];

  const routes = useRoutes([...dashboardRoutes]);

  return routes;
}
