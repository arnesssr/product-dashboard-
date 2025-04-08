import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, User } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/products/add', icon: <Package size={20} />, label: 'Products' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-sidebar-foreground">Product Dashboard</h1>
        </div>
        
        <nav className="flex-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-md transition-colors
                ${location.pathname === item.path 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
