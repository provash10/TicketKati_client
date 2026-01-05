import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const RequestedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Mock data - replace with actual API call
      const mockBookings = [
        {
          _id: '1',
          user: { name: 'John Doe', email: 'john@example.com' },
          ticketTitle: 'Dhaka to Chittagong Express',
          quantity: 2,
          totalPrice: 1700,
          status: 'pending'
        },
        {
          _id: '2',
          user: { name: 'Jane Smith', email: 'jane@example.com' },
          ticketTitle: 'Chittagong to Dhaka Premium',
          quantity: 1,
          totalPrice: 950,
          status: 'pending'
        }
      ];

      setBookings(mockBookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'accepted' }
          : booking
      ));
      toast.success('Booking accepted successfully!');
    } catch (error) {
      toast.error('Failed to accept booking');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'rejected' }
          : booking
      ));
      toast.success('Booking rejected successfully!');
    } catch (error) {
      toast.error('Failed to reject booking');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Requested Bookings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage booking requests from customers
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No booking requests
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Booking requests will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {booking.user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {booking.ticketTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {booking.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ৳{booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {booking.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAccept(booking._id)}
                            className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 flex items-center space-x-1"
                          >
                            <FaCheck />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleReject(booking._id)}
                            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 flex items-center space-x-1"
                          >
                            <FaTimes />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          booking.status === 'accepted' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
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

export default RequestedBookings;