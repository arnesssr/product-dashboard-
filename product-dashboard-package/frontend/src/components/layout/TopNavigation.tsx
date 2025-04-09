import { Search, Bell, User } from 'lucide-react';

const TopNavigation = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="w-96">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">3</span>
          </button>
          <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
