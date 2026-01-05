import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransport, setSelectedTransport] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  const ticketsPerPage = 6;

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterAndSortTickets();
  }, [tickets, searchQuery, selectedTransport, sortOrder]);

  const fetchTickets = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTickets = [
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
          departureTime: '2025-01-10T08:00:00Z',
          verificationStatus: 'approved'
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
          departureTime: '2025-01-12T06:30:00Z',
          verificationStatus: 'approved'
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
          departureTime: '2025-01-15T14:00:00Z',
          verificationStatus: 'approved'
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
          departureTime: '2025-01-08T22:00:00Z',
          verificationStatus: 'approved'
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
          departureTime: '2025-01-11T20:00:00Z',
          verificationStatus: 'approved'
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
          departureTime: '2025-01-13T16:30:00Z',
          verificationStatus: 'approved'
        },
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
          departureTime: '2025-01-09T07:00:00Z',
          verificationStatus: 'approved'
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
          departureTime: '2025-01-14T09:15:00Z',
          verificationStatus: 'approved'
        },
        {
          _id: '9',
          title: 'Dhaka to Rangpur Express',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
          price: 800,
          quantity: 60,
          transportType: 'Bus',
          from: 'Dhaka',
          to: 'Rangpur',
          perks: ['AC', 'WiFi'],
          departureTime: '2025-01-16T10:00:00Z',
          verificationStatus: 'approved'
        }
      ];

      // Filter only approved tickets
      const approvedTickets = mockTickets.filter(ticket => ticket.verificationStatus === 'approved');
      setTickets(approvedTickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const filterAndSortTickets = () => {
    let filtered = [...tickets];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.from.toLowerCase().includes(query) ||
        ticket.to.toLowerCase().includes(query) ||
        `${ticket.from} ${ticket.to}`.toLowerCase().includes(query)
      );
    }

    // Transport type filter
    if (selectedTransport) {
      filtered = filtered.filter(ticket => 
        ticket.transportType.toLowerCase() === selectedTransport.toLowerCase()
      );
    }

    // Sort by price
    if (sortOrder === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTransportFilter = (e) => {
    setSelectedTransport(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Pagination
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Tickets
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find and book your perfect journey
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location (From - To)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Transport Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedTransport}
                onChange={handleTransportFilter}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="">All Transport Types</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Plane">Plane</option>
                <option value="Launch">Launch</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              {sortOrder === 'high-to-low' ? (
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              ) : (
                <FaSortAmountUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              )}
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="">Sort by Price</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Showing {currentTickets.length} of {filteredTickets.length} tickets
          </div>
        </div>

        {/* Tickets Grid */}
        {currentTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tickets found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;