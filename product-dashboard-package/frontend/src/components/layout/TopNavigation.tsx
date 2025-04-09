import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const TopNavigation = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-30">
      <div className="px-6 h-full flex items-center justify-between">
        {/* Search Bar */}
        <div className="w-96">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* Profile Menu */}
          <div className="flex items-center space-x-3 border-l pl-4 ml-2">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-700">
                {user?.name || 'Admin User'}
              </span>
              <span className="text-xs text-gray-500">
                {user?.role || 'Administrator'}
              </span>
            </div>
            <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
