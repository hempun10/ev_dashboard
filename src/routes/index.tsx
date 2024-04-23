import NotFound from '@/pages/not-found';
import { useUserDetails } from '@/store/useUserDetails';
import path from 'path';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const ChargersPage = lazy(() => import('@/pages/charger/index'));
const StationPage = lazy(() => import('@/pages/stations/index'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const StationManager = lazy(() => import('@/pages/stationManager/index'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const { userDetails } = useUserDetails();
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
          index: userDetails.userType === 'StationManager' ? true : false,
          element: <ChargersPage />
        },
        {
          path: 'stations',
          element: <StationPage />
        },
        {
          path: 'settings',
          element: <SettingsPage />
        },
        {
          index: userDetails.userType === 'Admin' ? true : false,
          element: <StationManager />
        },
        {
          path: '404',
          element: <NotFound />
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />
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
