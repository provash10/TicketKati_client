import React, { useState, useEffect } from 'react';
import { FaUserShield, FaStore, FaExclamationTriangle } from 'react-icons/fa';
import LoadingSpinner from '../../LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock data - replace with actual API call
      const mockUsers = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          joinDate: '2025-01-01T00:00:00Z',
          isActive: true
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          joinDate: '2025-01-02T00:00:00Z',
          isActive: true
        },
        {
          _id: '3',
          name: 'Premium Transport Ltd.',
          email: 'contact@premium.com',
          role: 'vendor',
          joinDate: '2024-12-15T00:00:00Z',
          isActive: true,
          isFraud: false
        },
        {
          _id: '4',
          name: 'Railway Express',
          email: 'info@railway.com',
          role: 'vendor',
          joinDate: '2024-12-20T00:00:00Z',
          isActive: true,
          isFraud: false
        }
      ];

      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (userId) => {
    if (window.confirm('Are you sure you want to make this user an admin?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, role: 'admin' }
            : user
        ));
        toast.success('User promoted to admin successfully!');
      } catch (error) {
        toast.error('Failed to promote user');
      }
    }
  };

  const handleMakeVendor = async (userId) => {
    if (window.confirm('Are you sure you want to make this user a vendor?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, role: 'vendor', isFraud: false }
            : user
        ));
        toast.success('User promoted to vendor successfully!');
      } catch (error) {
        toast.error('Failed to promote user');
      }
    }
  };

  const handleMarkAsFraud = async (userId) => {
    if (window.confirm('Are you sure you want to mark this vendor as fraud? This will hide all their tickets and disable their ability to add new tickets.')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, isFraud: true, isActive: false }
            : user
        ));
        toast.success('Vendor marked as fraud successfully!');
      } catch (error) {
        toast.error('Failed to mark vendor as fraud');
      }
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      vendor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      user: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleConfig[role]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
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
          Manage Users
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage user roles and permissions
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Users will appear here
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
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Join Date
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
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {user.isFraud && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Fraud
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 flex items-center space-x-1"
                          >
                            <FaUserShield />
                            <span>Make Admin</span>
                          </button>
                        )}
                        
                        {user.role === 'user' && (
                          <button
                            onClick={() => handleMakeVendor(user._id)}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center space-x-1"
                          >
                            <FaStore />
                            <span>Make Vendor</span>
                          </button>
                        )}
                        
                        {user.role === 'vendor' && !user.isFraud && (
                          <button
                            onClick={() => handleMarkAsFraud(user._id)}
                            className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 flex items-center space-x-1"
                          >
                            <FaExclamationTriangle />
                            <span>Mark as Fraud</span>
                          </button>
                        )}
                      </div>
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

export default ManageUsers;