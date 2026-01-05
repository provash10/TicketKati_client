import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Remove Swiper imports temporarily to fix the build issue
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { 
  FaBus, 
  FaTrain, 
  FaPlane, 
  FaShip, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockAdvertisedTickets = [
        {
          _id: '1',
          title: 'Dhaka to Chittagong Express',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          price: 850,
          quantity: 45,
          transportType: 'Bus',
          from: 'Dhaka',
          to: 'Chittagong',
          perks: ['AC', 'WiFi', 'Snacks'],
          departureTime: '2025-01-10T08:00:00Z'
        },
        {
          _id: '2',
          title: 'Dhaka to Sylhet Luxury',
          image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
          price: 1200,
          quantity: 30,
          transportType: 'Train',
          from: 'Dhaka',
          to: 'Sylhet',
          perks: ['AC', 'Breakfast', 'WiFi'],
          departureTime: '2025-01-12T06:30:00Z'
        },
        {
          _id: '3',
          title: 'Dhaka to Cox\'s Bazar Flight',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
          price: 4500,
          quantity: 120,
          transportType: 'Plane',
          from: 'Dhaka',
          to: 'Cox\'s Bazar',
          perks: ['Meal', 'Entertainment', 'Baggage'],
          departureTime: '2025-01-15T14:00:00Z'
        },
        {
          _id: '4',
          title: 'Dhaka to Barisal Launch',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
          price: 650,
          quantity: 80,
          transportType: 'Launch',
          from: 'Dhaka',
          to: 'Barisal',
          perks: ['Cabin', 'Meals', 'Deck Access'],
          departureTime: '2025-01-08T22:00:00Z'
        },
        {
          _id: '5',
          title: 'Chittagong to Dhaka Premium',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          price: 950,
          quantity: 35,
          transportType: 'Bus',
          from: 'Chittagong',
          to: 'Dhaka',
          perks: ['AC', 'Reclining Seats', 'Entertainment'],
          departureTime: '2025-01-11T20:00:00Z'
        },
        {
          _id: '6',
          title: 'Sylhet to Dhaka Express',
          image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
          price: 1100,
          quantity: 40,
          transportType: 'Train',
          from: 'Sylhet',
          to: 'Dhaka',
          perks: ['AC', 'WiFi', 'Charging Port'],
          departureTime: '2025-01-13T16:30:00Z'
        }
      ];

      const mockLatestTickets = [
        {
          _id: '7',
          title: 'Rajshahi to Dhaka Comfort',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          price: 750,
          quantity: 50,
          transportType: 'Bus',
          from: 'Rajshahi',
          to: 'Dhaka',
          perks: ['AC', 'Snacks'],
          departureTime: '2025-01-09T07:00:00Z'
        },
        {
          _id: '8',
          title: 'Khulna to Dhaka Express',
          image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
          price: 900,
          quantity: 25,
          transportType: 'Train',
          from: 'Khulna',
          to: 'Dhaka',
          perks: ['AC', 'Meals'],
          departureTime: '2025-01-14T09:15:00Z'
        }
      ];

      setAdvertisedTickets(mockAdvertisedTickets);
      setLatestTickets(mockLatestTickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching home data:', error);
      setLoading(false);
    }
  };

  const getTransportIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'bus': return <FaBus />;
      case 'train': return <FaTrain />;
      case 'plane': return <FaPlane />;
      case 'launch': return <FaShip />;
      default: return <FaBus />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner/Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Temporary simple hero section without Swiper */}
        <div 
          className="h-full bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Travel Anywhere, Anytime
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Book bus, train, launch & flight tickets with ease
              </p>
              <Link to="/tickets" className="btn-primary text-lg px-8 py-3">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Tickets
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Handpicked deals for your next journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisedTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tickets Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Tickets
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Recently added travel options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/tickets" className="btn-primary text-lg px-8 py-3">
              View All Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Routes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Most traveled destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { from: 'Dhaka', to: 'Chittagong', trips: '150+ trips', icon: <FaBus /> },
              { from: 'Dhaka', to: 'Sylhet', trips: '120+ trips', icon: <FaTrain /> },
              { from: 'Dhaka', to: 'Cox\'s Bazar', trips: '80+ trips', icon: <FaPlane /> },
              { from: 'Dhaka', to: 'Barisal', trips: '90+ trips', icon: <FaShip /> }
            ].map((route, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-3xl text-primary-600 mb-4 flex justify-center">
                  {route.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {route.from} → {route.to}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{route.trips}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TicketBari?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your trusted travel companion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simple and quick booking process with just a few clicks
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Safe and secure payment gateway with multiple options
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Round-the-clock customer support for all your queries
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Best Prices
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Competitive prices with exclusive deals and offers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;