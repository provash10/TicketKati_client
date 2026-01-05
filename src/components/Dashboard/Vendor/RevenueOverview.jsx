import React, { useState, useEffect } from 'react';
import { FaChartLine, FaTicketAlt, FaDollarSign } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner.jsx';

const RevenueOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalTicketsAdded: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Mock data - replace with actual API call
      const mockStats = {
        totalRevenue: 45200,
        totalTicketsSold: 156,
        totalTicketsAdded: 25
      };

      setStats(mockStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Revenue Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your business performance and earnings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FaDollarSign className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ৳{stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FaTicketAlt className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Tickets Sold</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalTicketsSold}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <FaChartLine className="text-2xl text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Tickets Added</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalTicketsAdded}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Revenue Chart
        </h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <FaChartLine className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              Interactive charts will be implemented here
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              (Chart.js or Recharts integration needed)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;