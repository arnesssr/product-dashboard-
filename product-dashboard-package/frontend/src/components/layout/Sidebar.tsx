import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, User, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/products/add', icon: <Package />, label: 'Products' },
    { path: '/analytics', icon: <BarChart3 />, label: 'Analytics' },
    { path: '/settings', icon: <Settings />, label: 'Settings' },
    { path: '/profile', icon: <User />, label: 'Profile' },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Package className="w-6 h-6 text-blue-600" />
          <span className="ml-3 text-xl font-semibold">Dashboard</span>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-1 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
