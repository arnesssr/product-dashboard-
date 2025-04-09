import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  BarChart3, 
  Settings, 
  User, 
  BellDot, 
  LogOut 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
    { path: '/products/add', icon: <PackageSearch size={24} />, label: 'Products' },
    { path: '/analytics', icon: <BarChart3 size={24} />, label: 'Analytics' },
    { path: '/notifications', icon: <BellDot size={24} />, label: 'Notifications' },
    { path: '/settings', icon: <Settings size={24} />, label: 'Settings' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col w-16 bg-background border-r">
      {/* Logo */}
      <div className="flex items-center justify-center h-16">
        <PackageSearch size={28} className="text-primary" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="icon"
            asChild
            className={cn(
              "w-12 h-12 relative group",
              location.pathname === item.path && "bg-primary/10 text-primary"
            )}
          >
            <Link to={item.path}>
              {item.icon}
              <span className="absolute left-full ml-4 p-2 min-w-max rounded-md bg-popover text-xs 
                text-popover-foreground opacity-0 translate-x-2 group-hover:opacity-100 
                group-hover:translate-x-0 transition-all duration-200 invisible group-hover:visible 
                shadow-md">
                {item.label}
              </span>
            </Link>
          </Button>
        ))}
      </nav>

      {/* Profile & Logout */}
      <div className="px-2 py-4 space-y-2 border-t">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="w-12 h-12 relative group"
        >
          <Link to="/profile">
            <User size={24} />
            <span className="absolute left-full ml-4 p-2 min-w-max rounded-md bg-popover 
              text-xs text-popover-foreground opacity-0 translate-x-2 group-hover:opacity-100 
              group-hover:translate-x-0 transition-all duration-200 invisible group-hover:visible 
              shadow-md">
              Profile
            </span>
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
