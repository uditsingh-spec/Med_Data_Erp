import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Loader from './components/common/Loader';

// Lazy loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NewBaby = lazy(() => import('./pages/NewBaby'));
const BabyDetails = lazy(() => import('./pages/BabyDetails'));
const ObservationsDashboard = lazy(() => import('./pages/ObservationsDashboard'));
const Employees = lazy(() => import('./pages/Employees'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Suspense fallback={<Loader />}><Dashboard /></Suspense>,
          },
          {
            path: 'profile',
            element: <Suspense fallback={<Loader />}><Profile /></Suspense>,
          },
          {
            path: 'new-baby',
            element: <Suspense fallback={<Loader />}><NewBaby /></Suspense>,
          },
          {
            path: 'observations',
            element: <Suspense fallback={<Loader />}><ObservationsDashboard /></Suspense>,
          },
          {
            path: 'babies/:id',
            element: <Suspense fallback={<Loader />}><BabyDetails /></Suspense>,
          },
          {
            path: 'employees',
            element: <Suspense fallback={<Loader />}><Employees /></Suspense>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
