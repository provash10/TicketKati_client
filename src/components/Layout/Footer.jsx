import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaBus className="text-2xl text-primary-400" />
              <span className="text-xl font-bold">TicketBari</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Book bus, train, launch & flight tickets easily. Your trusted travel companion for seamless journeys across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  All Tickets
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="font-medium">Email:</span><br />
                support@ticketbari.com
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Phone:</span><br />
                +880 1234-567890
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Facebook Page:</span><br />
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                  fb.com/ticketbari
                </a>
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Address:</span><br />
                123 Travel Street, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <span className="text-gray-300 text-sm">Visa Card</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <span className="text-gray-300 text-sm">MasterCard</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">$</span>
                </div>
                <span className="text-gray-300 text-sm">Stripe</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">bK</span>
                </div>
                <span className="text-gray-300 text-sm">bKash</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TicketBari. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;