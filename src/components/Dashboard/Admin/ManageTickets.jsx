import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTickets = [
        {
          _id: '1',
          title: 'Dhaka to Chittagong Express',
          vendor: { name: 'Premium Transport Ltd.', email: 'contact@premium.com' },
          from: 'Dhaka',
          to: 'Chittagong',
          transportType: 'Bus',
          price: 850,
          quantity: 45,
          verificationStatus: 'pending',
          createdAt: '2025-01-05T10:30:00Z'
        },
        {
          _id: '2',
          title: 'Sylhet to Dhaka Train',
          vendor: { name: 'Railway Express', email: 'info@railway.com' },
          from: 'Sylhet',
          to: 'Dhaka',
          transportType: 'Train',
          price: 1200,
          quantity: 60,
          verificationStatus: 'pending',
          createdAt: '2025-01-04T14:20:00Z'
        },
        {
          _id: '3',
          title: 'Cox\'s Bazar Flight',
          vendor: { name: 'Sky Airlines', email: 'booking@sky.com' },
          from: 'Dhaka',
          to: 'Cox\'s Bazar',
          transportType: 'Plane',
          price: 4500,
          quantity: 120,
          verificationStatus: 'approved',
          createdAt: '2025-01-03T09:15:00Z'
        }
      ];

      setTickets(mockTickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (ticketId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTickets(tickets.map(ticket => 
        ticket._id === ticketId 
          ? { ...ticket, verificationStatus: 'approved' }
          : ticket
      ));
      toast.success('Ticket approved successfully!');
    } catch (error) {
      toast.error('Failed to approve ticket');
    }
  };

  const handleReject = async (ticketId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTickets(tickets.map(ticket => 
        ticket._id === ticketId 
          ? { ...ticket, verificationStatus: 'rejected' }
          : ticket
      ));
      toast.success('Ticket rejected successfully!');
    } catch (error) {
      toast.error('Failed to reject ticket');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Manage Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Review and approve ticket submissions from vendors
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tickets to review
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ticket submissions will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ticket Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {ticket.transportType} • {ticket.quantity} seats
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {formatDate(ticket.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.vendor.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {ticket.vendor.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {ticket.from} → {ticket.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ৳{ticket.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(ticket.verificationStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {ticket.verificationStatus === 'pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(ticket._id)}
                            className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 flex items-center space-x-1"
                          >
                            <FaCheck />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReject(ticket._id)}
                            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 flex items-center space-x-1"
                          >
                            <FaTimes />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center space-x-1">
                          <FaEye />
                          <span>View</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;