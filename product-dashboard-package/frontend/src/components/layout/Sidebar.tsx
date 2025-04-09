import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, User, BarChart3, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/products/add', icon: <Package size={20} />, label: 'Products' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <Package className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold">Dashboard</span>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-500' 
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2 px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <User size={16} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md dark:text-gray-400 dark:hover:bg-gray-800">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
