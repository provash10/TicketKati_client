import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner';
import toast from 'react-hot-toast';

const MyAddedTickets = () => {
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
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          from: 'Dhaka',
          to: 'Chittagong',
          transportType: 'Bus',
          price: 850,
          quantity: 45,
          verificationStatus: 'approved',
          departureTime: '2025-01-10T08:00:00Z'
        },
        {
          _id: '2',
          title: 'Chittagong to Dhaka Premium',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          from: 'Chittagong',
          to: 'Dhaka',
          transportType: 'Bus',
          price: 950,
          quantity: 35,
          verificationStatus: 'pending',
          departureTime: '2025-01-11T20:00:00Z'
        },
        {
          _id: '3',
          title: 'Dhaka to Sylhet Comfort',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          from: 'Dhaka',
          to: 'Sylhet',
          transportType: 'Bus',
          price: 750,
          quantity: 40,
          verificationStatus: 'rejected',
          departureTime: '2025-01-09T07:00:00Z'
        }
      ];

      setTickets(mockTickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
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

  const handleUpdate = (ticketId) => {
    // Navigate to update form or open modal
    console.log('Update ticket:', ticketId);
    toast.info('Update functionality will be implemented');
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        // Mock API call - replace with actual implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        toast.success('Ticket deleted successfully');
      } catch (error) {
        toast.error('Failed to delete ticket');
      }
    }
  };

  const isActionDisabled = (status) => status === 'rejected';

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Added Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your ticket listings and track their approval status
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tickets added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Start by adding your first ticket
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(ticket.verificationStatus)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {ticket.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Route:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {ticket.from} → {ticket.to}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {ticket.transportType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Price:</span>
                    <span className="font-bold text-primary-600">৳{ticket.price}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Quantity:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {ticket.quantity} seats
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(ticket._id)}
                    disabled={isActionDisabled(ticket.verificationStatus)}
                    className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isActionDisabled(ticket.verificationStatus)
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                    }`}
                  >
                    <FaEdit />
                    <span>Update</span>
                  </button>

                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={isActionDisabled(ticket.verificationStatus)}
                    className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isActionDisabled(ticket.verificationStatus)
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                    }`}
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>

                {ticket.verificationStatus === 'rejected' && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
                    Actions disabled for rejected tickets
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;