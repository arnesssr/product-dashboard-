import { useState, useEffect } from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsCard from '../components/dashboard/StatsCard';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import RecentProducts from '../components/products/RecentProducts';
import { Package, ShoppingBag, Eye, Archive } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { products, loading, error, fetchProducts, deleteProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [newOrders] = useState(5);
  const [productsToReview] = useState(3);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Calculate stats
  const totalProducts = products.length;
  const publishedProducts = products.filter(p => p.status === 'Published').length;
  const draftProducts = products.filter(p => p.status === 'Draft').length;
  
  const statsCards = [
    { 
      title: 'Total Products', 
      value: totalProducts, 
      icon: <Package size={20} />, 
      percentageChange: 12 
    },
    { 
      title: 'Published Products', 
      value: publishedProducts, 
      icon: <ShoppingBag size={20} />, 
      percentageChange: 8 
    },
    { 
      title: 'Draft Products', 
      value: draftProducts, 
      icon: <Archive size={20} />, 
      percentageChange: -5 
    },
    { 
      title: 'Views Today', 
      value: 1243, 
      icon: <Eye size={20} />, 
      percentageChange: 24 
    }
  ];
  
  // Calculate category distribution
  const categoryCounts = products.reduce((acc, product) => {
    const category = product.category || 'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryData = Object.keys(categoryCounts).map((name, index) => {
    const count = categoryCounts[name];
    const percentage = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
    
    // Assign colors based on category
    const colors = {
      'Books': '#4F46E5',
      'Bibles': '#10B981',
      'Journals': '#F59E0B',
      'Other': '#6B7280'
    };
    
    return {
      name,
      count,
      percentage,
      color: colors[name] || '#6B7280'
    };
  });
  
  const handleEditProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };
  
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>;
  }
  
  return (
    <div>
      <WelcomeBanner 
        userName={user?.name || 'User'} 
        newOrders={newOrders} 
        productsToReview={productsToReview} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((card, index) => (
          <StatsCard 
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            percentageChange={card.percentageChange}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsSection categoryData={categoryData} />
        </div>
        <div>
          <RecentProducts 
            products={products.map(p => ({
              id: p.id,
              name: p.productName,
              price: p.price,
              status: p.status,
              description: p.description,
              imageUrl: p.imageUrl
            }))}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
