import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import UserProfile from '../../components/Dashboard/User/UserProfile';
import MyBookedTickets from '../../components/Dashboard/User/MyBookedTickets';
import TransactionHistory from '../../components/Dashboard/User/TransactionHistory';

const UserDashboard = () => {
  const sidebarItems = [
    {
      name: 'User Profile',
      path: 'profile',
      icon: 'FaUser'
    },
    {
      name: 'My Booked Tickets',
      path: 'bookings',
      icon: 'FaTicketAlt'
    },
    {
      name: 'Transaction History',
      path: 'transactions',
      icon: 'FaHistory'
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="User Dashboard">
      <Routes>
        <Route index element={<UserProfile />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="bookings" element={<MyBookedTickets />} />
        <Route path="transactions" element={<TransactionHistory />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserDashboard;