import React, { useState, useEffect } from 'react';
import { 
  FaTicketAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaTag,
  FaCreditCard,
  FaCheckCircle,
  FaTimes,
  FaHourglassHalf
} from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner';
import toast from 'react-hot-toast';

const MyBookedTickets = () => {
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
          ticket: {
            _id: 'ticket1',
            title: 'Dhaka to Chittagong Express',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
            from: 'Dhaka',
            to: 'Chittagong',
            transportType: 'Bus',
            departureTime: '2025-01-10T08:00:00Z'
          },
          quantity: 2,
          totalPrice: 1700,
          status: 'pending',
          bookingDate: '2025-01-05T10:30:00Z'
        },
        {
          _id: '2',
          ticket: {
            _id: 'ticket2',
            title: 'Dhaka to Sylhet Luxury',
            image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
            from: 'Dhaka',
            to: 'Sylhet',
            transportType: 'Train',
            departureTime: '2025-01-12T06:30:00Z'
          },
          quantity: 1,
          totalPrice: 1200,
          status: 'accepted',
          bookingDate: '2025-01-04T14:20:00Z'
        },
        {
          _id: '3',
          ticket: {
            _id: 'ticket3',
            title: 'Chittagong to Dhaka Premium',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
            from: 'Chittagong',
            to: 'Dhaka',
            transportType: 'Bus',
            departureTime: '2025-01-08T20:00:00Z'
          },
          quantity: 1,
          totalPrice: 950,
          status: 'paid',
          bookingDate: '2025-01-03T09:15:00Z'
        },
        {
          _id: '4',
          ticket: {
            _id: 'ticket4',
            title: 'Dhaka to Rangpur Express',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
            from: 'Dhaka',
            to: 'Rangpur',
            transportType: 'Bus',
            departureTime: '2025-01-06T10:00:00Z'
          },
          quantity: 3,
          totalPrice: 2400,
          status: 'rejected',
          bookingDate: '2025-01-02T16:45:00Z'
        }
      ];

      setBookings(mockBookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        icon: <FaHourglassHalf />
      },
      accepted: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        icon: <FaCheckCircle />
      },
      rejected: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        icon: <FaTimes />
      },
      paid: {
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        icon: <FaCreditCard />
      }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getCountdown = (departureTime) => {
    const now = new Date().getTime();
    const departure = new Date(departureTime).getTime();
    const difference = departure - now;

    if (difference <= 0) {
      return 'Departed';
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      return `${hours}h`;
    }
  };

  const handlePayNow = async (bookingId, amount) => {
    try {
      // Mock payment - replace with actual Stripe integration
      toast.success('Payment successful!');
      
      // Update booking status
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'paid' }
          : booking
      ));
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  const canMakePayment = (booking) => {
    const now = new Date().getTime();
    const departureTime = new Date(booking.ticket.departureTime).getTime();
    return booking.status === 'accepted' && departureTime > now;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Booked Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your ticket bookings and payments
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <FaTicketAlt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Start booking your tickets to see them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const { date, time } = formatDateTime(booking.ticket.departureTime);
            const countdown = getCountdown(booking.ticket.departureTime);
            
            return (
              <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={booking.ticket.image}
                    alt={booking.ticket.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(booking.status)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {booking.ticket.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{booking.ticket.from} → {booking.ticket.to}</span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <FaClock className="mr-2" />
                      <div>
                        <div>{date}</div>
                        <div className="font-medium">{time}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaUsers className="mr-2" />
                        <span>{booking.quantity} tickets</span>
                      </div>
                      
                      <div className="flex items-center text-primary-600">
                        <FaTag className="mr-1" />
                        <span className="font-bold">৳{booking.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Countdown */}
                  {booking.status !== 'rejected' && countdown !== 'Departed' && (
                    <div className="mb-4">
                      <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                          Time Remaining
                        </p>
                        <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                          {countdown}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {booking.status === 'accepted' && canMakePayment(booking) && (
                    <button
                      onClick={() => handlePayNow(booking._id, booking.totalPrice)}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <FaCreditCard />
                      <span>Pay Now</span>
                    </button>
                  )}

                  {booking.status === 'paid' && (
                    <div className="w-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 py-2 px-4 rounded-lg text-center font-medium">
                      Payment Completed
                    </div>
                  )}

                  {booking.status === 'rejected' && (
                    <div className="w-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 py-2 px-4 rounded-lg text-center font-medium">
                      Booking Rejected
                    </div>
                  )}

                  {booking.status === 'pending' && (
                    <div className="w-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 py-2 px-4 rounded-lg text-center font-medium">
                      Awaiting Vendor Approval
                    </div>
                  )}

                  {booking.status === 'accepted' && !canMakePayment(booking) && (
                    <div className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2 px-4 rounded-lg text-center font-medium">
                      Payment Expired
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;