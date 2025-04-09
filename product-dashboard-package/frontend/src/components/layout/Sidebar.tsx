import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  User, 
  ShoppingCart, 
  Users, 
  BarChart3,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/products/add', icon: <Package size={20} />, label: 'Products' },
    { path: '/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6 dark:border-gray-700">
          <Package className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold">Product Dashboard</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${location.pathname === item.path 
                  ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-500' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</span>
            </div>
          </div>
          <button className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
