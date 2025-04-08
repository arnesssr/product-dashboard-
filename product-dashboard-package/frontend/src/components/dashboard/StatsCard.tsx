import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  percentageChange: number;
}

const StatsCard = ({ title, value, icon, percentageChange }: StatsCardProps) => {
  const isPositive = percentageChange >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold">{value.toLocaleString()}</p>
        
        <div className="flex items-center mt-2">
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="ml-1 font-medium">{Math.abs(percentageChange)}%</span>
          </div>
          <span className="text-gray-500 text-sm ml-2">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
