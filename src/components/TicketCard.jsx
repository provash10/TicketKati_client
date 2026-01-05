import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBus, 
  FaTrain, 
  FaPlane, 
  FaShip, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers,
  FaTag
} from 'react-icons/fa';

const TicketCard = ({ ticket }) => {
  const getTransportIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'bus': return <FaBus className="text-blue-600" />;
      case 'train': return <FaTrain className="text-green-600" />;
      case 'plane': return <FaPlane className="text-purple-600" />;
      case 'launch': return <FaShip className="text-cyan-600" />;
      default: return <FaBus className="text-blue-600" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
            {getTransportIcon(ticket.transportType)}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-primary-600 text-white px-2 py-1 rounded-full text-sm font-medium">
            {ticket.transportType}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {ticket.title}
        </h3>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
          <FaMapMarkerAlt className="mr-2" />
          <span className="text-sm">
            {ticket.from} → {ticket.to}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FaClock className="mr-2" />
            <div className="text-sm">
              <div>{formatDate(ticket.departureTime)}</div>
              <div className="font-medium">{formatTime(ticket.departureTime)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FaUsers className="mr-2" />
            <span className="text-sm">{ticket.quantity} seats</span>
          </div>
        </div>
        
        {ticket.perks && ticket.perks.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {ticket.perks.slice(0, 3).map((perk, index) => (
                <span
                  key={index}
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full"
                >
                  {perk}
                </span>
              ))}
              {ticket.perks.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{ticket.perks.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaTag className="text-primary-600 mr-2" />
            <span className="text-2xl font-bold text-primary-600">
              ৳{ticket.price}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
              /person
            </span>
          </div>
          
          <Link
            to={`/ticket/${ticket._id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;