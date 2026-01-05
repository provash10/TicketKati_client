import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [advertisedCount, setAdvertisedCount] = useState(0);

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
          vendor: { name: 'Premium Transport Ltd.' },
          from: 'Dhaka',
          to: 'Chittagong',
          transportType: 'Bus',
          price: 850,
          quantity: 45,
          isAdvertised: true,
          verificationStatus: 'approved'
        },
        {
          _id: '2',
          title: 'Sylhet to Dhaka Train',
          vendor: { name: 'Railway Express' },
          from: 'Sylhet',
          to: 'Dhaka',
          transportType: 'Train',
          price: 1200,
          quantity: 60,
          isAdvertised: false,
          verificationStatus: 'approved'
        },
        {
          _id: '3',
          title: 'Cox\'s Bazar Flight',
          vendor: { name: 'Sky Airlines' },
          from: 'Dhaka',
          to: 'Cox\'s Bazar',
          transportType: 'Plane',
          price: 4500,
          quantity: 120,
          isAdvertised: true,
          verificationStatus: 'approved'
        },
        {
          _id: '4',
          title: 'Dhaka to Barisal Launch',
          vendor: { name: 'Water Transport' },
          from: 'Dhaka',
          to: 'Barisal',
          transportType: 'Launch',
          price: 650,
          quantity: 80,
          isAdvertised: false,
          verificationStatus: 'approved'
        },
        {
          _id: '5',
          title: 'Chittagong to Dhaka Premium',
          vendor: { name: 'Premium Transport Ltd.' },
          from: 'Chittagong',
          to: 'Dhaka',
          transportType: 'Bus',
          price: 950,
          quantity: 35,
          isAdvertised: true,
          verificationStatus: 'approved'
        }
      ];

      // Filter only approved tickets
      const approvedTickets = mockTickets.filter(ticket => ticket.verificationStatus === 'approved');
      setTickets(approvedTickets);
      
      // Count advertised tickets
      const advertised = approvedTickets.filter(ticket => ticket.isAdvertised).length;
      setAdvertisedCount(advertised);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const handleToggleAdvertise = async (ticketId, currentStatus) => {
    // Check if trying to advertise when already at limit
    if (!currentStatus && advertisedCount >= 6) {
      toast.error('Cannot advertise more than 6 tickets at a time');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTickets(tickets.map(ticket => 
        ticket._id === ticketId 
          ? { ...ticket, isAdvertised: !currentStatus }
          : ticket
      ));

      // Update advertised count
      setAdvertisedCount(prev => currentStatus ? prev - 1 : prev + 1);

      toast.success(
        currentStatus 
          ? 'Ticket removed from advertisement' 
          : 'Ticket added to advertisement'
      );
    } catch (error) {
      toast.error('Failed to update advertisement status');
    }
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
          Advertise Tickets
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage which tickets appear in the featured section on homepage
        </p>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Currently advertising {advertisedCount} out of 6 maximum tickets
        </div>
      </div>

      {/* Advertisement Limit Warning */}
      {advertisedCount >= 6 && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <FaBullhorn className="text-yellow-600 dark:text-yellow-400 mr-2" />
            <p className="text-yellow-800 dark:text-yellow-200">
              You have reached the maximum limit of 6 advertised tickets. 
              Remove some tickets from advertisement to add new ones.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No approved tickets found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Approved tickets will appear here for advertisement
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
                    Advertisement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
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
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {ticket.vendor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {ticket.from} → {ticket.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ৳{ticket.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        ticket.isAdvertised
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {ticket.isAdvertised ? 'Advertised' : 'Not Advertised'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)}
                        disabled={!ticket.isAdvertised && advertisedCount >= 6}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                          ticket.isAdvertised
                            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                            : advertisedCount >= 6
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                              : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        {ticket.isAdvertised ? (
                          <>
                            <FaToggleOff />
                            <span>Unadvertise</span>
                          </>
                        ) : (
                          <>
                            <FaToggleOn />
                            <span>Advertise</span>
                          </>
                        )}
                      </button>
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

export default AdvertiseTickets;