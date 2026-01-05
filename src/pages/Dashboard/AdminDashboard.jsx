import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import AdminProfile from '../../components/Dashboard/Admin/AdminProfile';
import ManageTickets from '../../components/Dashboard/Admin/ManageTickets';
import ManageUsers from '../../components/Dashboard/Admin/ManageUsers';
import AdvertiseTickets from '../../components/Dashboard/Admin/AdvertiseTickets';

const AdminDashboard = () => {
  const sidebarItems = [
    {
      name: 'Admin Profile',
      path: 'profile',
      icon: 'FaUser'
    },
    {
      name: 'Manage Tickets',
      path: 'tickets',
      icon: 'FaTicketAlt'
    },
    {
      name: 'Manage Users',
      path: 'users',
      icon: 'FaUsers'
    },
    {
      name: 'Advertise Tickets',
      path: 'advertise',
      icon: 'FaBullhorn'
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Admin Dashboard">
      <Routes>
        <Route index element={<AdminProfile />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="tickets" element={<ManageTickets />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="advertise" element={<AdvertiseTickets />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;