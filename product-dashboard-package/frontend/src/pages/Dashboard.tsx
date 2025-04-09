import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Products', value: '2,345', icon: <Package className="h-5 w-5" />, change: '+12%' },
    { label: 'Active Sales', value: '845', icon: <ShoppingBag className="h-5 w-5" />, change: '+24%' },
    { label: 'Active Users', value: '1,235', icon: <Users className="h-5 w-5" />, change: '+8%' },
    { label: 'Revenue', value: '$34,234', icon: <TrendingUp className="h-5 w-5" />, change: '+18%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {user?.name}</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add New Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                {stat.icon}
              </div>
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold">{stat.value}</h3>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          {/* Add chart component here */}
          <div className="h-80 bg-gray-50 rounded-lg"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
