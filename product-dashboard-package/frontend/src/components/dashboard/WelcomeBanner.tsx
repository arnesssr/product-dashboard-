import { Clock } from 'lucide-react';

interface WelcomeBannerProps {
  userName: string;
  newOrders: number;
  productsToReview: number;
}

const WelcomeBanner = ({ userName, newOrders, productsToReview }: WelcomeBannerProps) => {
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-blue-100 mb-4">
            You have {newOrders} new orders and {productsToReview} products that need review.
          </p>
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            View Orders
          </button>
        </div>
        <div className="flex items-center text-blue-100">
          <Clock size={20} className="mr-2" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
