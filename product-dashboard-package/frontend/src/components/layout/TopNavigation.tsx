import { useState } from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronDown,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const TopNavigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-4 ml-64">
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MessageSquare size={20} />
            {messages > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {messages}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              U
            </div>
            <span>User Name</span>
            <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User size={16} className="mr-2" />
                Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={16} className="mr-2" />
                Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
