import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaTicketAlt, 
  FaHistory, 
  FaPlus, 
  FaClipboardList, 
  FaChartLine,
  FaUsers,
  FaBullhorn,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const DashboardLayout = ({ children, sidebarItems, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getIcon = (iconName) => {
    const icons = {
      FaUser: <FaUser />,
      FaTicketAlt: <FaTicketAlt />,
      FaHistory: <FaHistory />,
      FaPlus: <FaPlus />,
      FaClipboardList: <FaClipboardList />,
      FaChartLine: <FaChartLine />,
      FaUsers: <FaUsers />,
      FaBullhorn: <FaBullhorn />
    };
    return icons[iconName] || <FaUser />;
  };

  const isActive = (path) => {
    const currentPath = location.pathname;
    const basePath = currentPath.split('/').slice(0, 3).join('/'); // /dashboard/user or /dashboard/vendor or /dashboard/admin
    return currentPath === `${basePath}/${path}` || (path === 'profile' && currentPath === basePath);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="mt-6">
            <div className="px-3">
              {sidebarItems.map((item) => {
                const basePath = location.pathname.split('/').slice(0, 3).join('/');
                const linkPath = `${basePath}/${item.path}`;
                
                return (
                  <Link
                    key={item.path}
                    to={linkPath}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-2 mb-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3">{getIcon(item.icon)}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile header */}
          <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <FaBars />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
              <div></div>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;