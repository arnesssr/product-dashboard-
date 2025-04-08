import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Tag, 
  User, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Product', path: '/products/add', icon: <PlusCircle size={20} /> },
    { name: 'Categories', path: '/categories', icon: <Tag size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`bg-slate-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && <h1 className="text-xl font-bold">ProductDash</h1>}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-slate-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.path
                    ? 'bg-slate-700 border-l-4 border-blue-500'
                    : 'hover:bg-slate-700'
                } transition-colors`}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div className="ml-3">
              <p className="font-medium">User Name</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
