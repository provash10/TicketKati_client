import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import AllTickets from './pages/AllTickets';
import TicketDetails from './pages/TicketDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserDashboard from './pages/Dashboard/UserDashboard';
import VendorDashboard from './pages/Dashboard/VendorDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register", 
    element: <Register />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "tickets",
        element: (
          <ProtectedRoute>
            <AllTickets />
          </ProtectedRoute>
        )
      },
      {
        path: "ticket/:id",
        element: (
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        )
      },
      {
        path: "dashboard/user/*",
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "dashboard/vendor/*",
        element: (
          <ProtectedRoute role="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "dashboard/admin/*",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;