import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import VendorProfile from '../../components/Dashboard/Vendor/VendorProfile';
import AddTicket from '../../components/Dashboard/Vendor/AddTicket';
import MyAddedTickets from '../../components/Dashboard/Vendor/MyAddedTickets';
import RequestedBookings from '../../components/Dashboard/Vendor/RequestedBookings';
import RevenueOverview from '../../components/Dashboard/Vendor/RevenueOverview';

const VendorDashboard = () => {
  const sidebarItems = [
    {
      name: 'Vendor Profile',
      path: 'profile',
      icon: 'FaUser'
    },
    {
      name: 'Add Ticket',
      path: 'add-ticket',
      icon: 'FaPlus'
    },
    {
      name: 'My Added Tickets',
      path: 'tickets',
      icon: 'FaTicketAlt'
    },
    {
      name: 'Requested Bookings',
      path: 'bookings',
      icon: 'FaClipboardList'
    },
    {
      name: 'Revenue Overview',
      path: 'revenue',
      icon: 'FaChartLine'
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Vendor Dashboard">
      <Routes>
        <Route index element={<VendorProfile />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="add-ticket" element={<AddTicket />} />
        <Route path="tickets" element={<MyAddedTickets />} />
        <Route path="bookings" element={<RequestedBookings />} />
        <Route path="revenue" element={<RevenueOverview />} />
      </Routes>
    </DashboardLayout>
  );
};

export default VendorDashboard;