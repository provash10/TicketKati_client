import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaBus, 
  FaTrain, 
  FaPlane, 
  FaShip, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers,
  FaTag,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  useEffect(() => {
    if (ticket) {
      const timer = setInterval(() => {
        updateCountdown();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [ticket]);

  const fetchTicketDetails = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTicket = {
        _id: id,
        title: 'Dhaka to Chittagong Express',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
        price: 850,
        quantity: 45,
        transportType: 'Bus',
        from: 'Dhaka',
        to: 'Chittagong',
        perks: ['AC', 'WiFi', 'Snacks', 'Reclining Seats', 'Entertainment'],
        departureTime: '2025-01-10T08:00:00Z',
        description: 'Experience comfortable travel from Dhaka to Chittagong with our premium bus service. Enjoy air conditioning, complimentary WiFi, and delicious snacks during your journey.',
        vendor: {
          name: 'Premium Transport Ltd.',
          email: 'contact@premiumtransport.com'
        },
        route: 'Dhaka → Comilla → Chittagong',
        duration: '6 hours',
        facilities: [
          'Air Conditioning',
          'Free WiFi',
          'Complimentary Snacks',
          'Reclining Seats',
          'Entertainment System',
          'USB Charging Ports',
          'Professional Driver',
          'GPS Tracking'
        ]
      };

      setTicket(mockTicket);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      setLoading(false);
    }
  };

  const updateCountdown = () => {
    if (!ticket) return;

    const now = new Date().getTime();
    const departureTime = new Date(ticket.departureTime).getTime();
    const difference = departureTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    } else {
      setTimeLeft('Departed');
    }
  };

  const getTransportIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'bus': return <FaBus className="text-blue-600" />;
      case 'train': return <FaTrain className="text-green-600" />;
      case 'plane': return <FaPlane className="text-purple-600" />;
      case 'launch': return <FaShip className="text-cyan-600" />;
      default: return <FaBus className="text-blue-600" />;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const isBookingDisabled = () => {
    if (!ticket) return true;
    const now = new Date().getTime();
    const departureTime = new Date(ticket.departureTime).getTime();
    return departureTime <= now || ticket.quantity === 0;
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (bookingQuantity > ticket.quantity) {
      toast.error('Booking quantity cannot exceed available tickets');
      return;
    }

    try {
      // Mock booking - replace with actual API call
      const bookingData = {
        ticketId: ticket._id,
        userId: user.id,
        quantity: bookingQuantity,
        totalPrice: ticket.price * bookingQuantity,
        status: 'pending'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Booking request submitted successfully!');
      setShowBookingModal(false);
      setBookingQuantity(1);
      
      // Navigate to user dashboard
      navigate('/dashboard/user/bookings');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ticket Not Found
          </h2>
          <button
            onClick={() => navigate('/tickets')}
            className="btn-primary"
          >
            Back to All Tickets
          </button>
        </div>
      </div>
    );
  }

  const { date, time } = formatDateTime(ticket.departureTime);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                {getTransportIcon(ticket.transportType)}
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                  {ticket.transportType}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{ticket.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route & Time Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Journey Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Route</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ticket.from} → {ticket.to}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaClock className="text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Duration</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ticket.duration}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Available Seats</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ticket.quantity} seats
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaTag className="text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Price per person</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ৳{ticket.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {ticket.description}
              </p>
            </div>

            {/* Facilities */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Facilities & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ticket.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {facility}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Vendor Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Company:</span> {ticket.vendor.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Contact:</span> {ticket.vendor.email}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Booking Information
              </h3>
              
              {/* Departure Info */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Departure</p>
                <p className="font-medium text-gray-900 dark:text-white">{date}</p>
                <p className="text-primary-600 font-medium">{time}</p>
              </div>

              {/* Countdown */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Time Remaining</p>
                <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-3">
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400 text-center">
                    {timeLeft}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Price per person</span>
                  <span className="text-2xl font-bold text-primary-600">৳{ticket.price}</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                disabled={isBookingDisabled()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isBookingDisabled()
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {timeLeft === 'Departed' 
                  ? 'Departed' 
                  : ticket.quantity === 0 
                    ? 'Sold Out' 
                    : 'Book Now'
                }
              </button>

              {ticket.quantity > 0 && ticket.quantity <= 10 && (
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-2 text-center">
                  Only {ticket.quantity} seats left!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Book Tickets
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Tickets
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={ticket.quantity}
                    value={bookingQuantity}
                    onChange={(e) => setBookingQuantity(parseInt(e.target.value))}
                    className="input-field"
                    required
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Maximum {ticket.quantity} tickets available
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Total Amount:</span>
                    <span className="text-xl font-bold text-primary-600">
                      ৳{ticket.price * bookingQuantity}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetails;