import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FaPlus, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AddTicket = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    from: '',
    to: '',
    transportType: '',
    price: '',
    quantity: '',
    departureDate: '',
    departureTime: '',
    perks: [],
    image: ''
  });

  const [loading, setLoading] = useState(false);

  const transportTypes = ['Bus', 'Train', 'Plane', 'Launch'];
  const availablePerks = ['AC', 'WiFi', 'Breakfast', 'Snacks', 'Entertainment', 'Reclining Seats'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePerkChange = (perk) => {
    setFormData({
      ...formData,
      perks: formData.perks.includes(perk)
        ? formData.perks.filter(p => p !== perk)
        : [...formData.perks, perk]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - replace with actual implementation
      const ticketData = {
        ...formData,
        vendorName: user.name,
        vendorEmail: user.email,
        verificationStatus: 'pending'
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Ticket added successfully! Awaiting admin approval.');
      
      // Reset form
      setFormData({
        title: '',
        from: '',
        to: '',
        transportType: '',
        price: '',
        quantity: '',
        departureDate: '',
        departureTime: '',
        perks: [],
        image: ''
      });
    } catch (error) {
      toast.error('Failed to add ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Ticket
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Create a new ticket for your transport service
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Dhaka to Chittagong Express"
                required
              />
            </div>

            {/* From Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Location *
              </label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Dhaka"
                required
              />
            </div>

            {/* To Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Location *
              </label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Chittagong"
                required
              />
            </div>

            {/* Transport Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transport Type *
              </label>
              <select
                name="transportType"
                value={formData.transportType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Transport Type</option>
                {transportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (per unit) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., 850"
                min="1"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., 45"
                min="1"
                required
              />
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure Date *
              </label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Departure Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Departure Time *
              </label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {/* Perks */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Perks & Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availablePerks.map(perk => (
                  <label key={perk} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.perks.includes(perk)}
                      onChange={() => handlePerkChange(perk)}
                      className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendor Info (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                className="input-field bg-gray-100 dark:bg-gray-700"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vendor Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                className="input-field bg-gray-100 dark:bg-gray-700"
                readOnly
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus />
              <span>{loading ? 'Adding Ticket...' : 'Add Ticket'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;