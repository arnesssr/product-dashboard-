import { useState, useEffect } from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsCard from '../components/dashboard/StatsCard';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import RecentProducts from '../components/products/RecentProducts';
import { Package, ShoppingBag, Eye, Archive } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  productName: string;
  price: number;
  status: 'Published' | 'Draft';
  description: string;
  imageUrl: string;
  category: string;
}

interface CategoryData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface StatsCard {
  title: string;
  value: number;
  icon: JSX.Element;
  percentageChange: number;
}

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
  const publishedProducts: number = products.filter((p: Product) => p.status === 'Published').length;
  const draftProducts: number = products.filter((p: Product) => p.status === 'Draft').length;
  
  const statsCards: StatsCard[] = [
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
  interface CategoryCount {
    [key: string]: number;
  }

  const categoryCounts: CategoryCount = products.reduce((acc: CategoryCount, product: Product) => {
      const category = product.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
  }, {} as CategoryCount);
  
  const categoryData: CategoryData[] = Object.keys(categoryCounts).map((name) => {
    const count = categoryCounts[name];
    const percentage = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
    
    // Assign colors based on category
    const colors: Record<string, string> = {
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
  
  const handleEditProduct = (id: string) => {
    navigate(`/products/edit/${id}`);
  };
  
  const handleDeleteProduct = async (id: string) => {
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
  
  const recentProducts = products.map((p: Product) => ({
    id: p.id,
    name: p.productName,
    price: p.price,
    status: p.status,
    description: p.description,
    imageUrl: p.imageUrl
  }));
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Download Report
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add Product
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <StatsCard 
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            percentageChange={card.percentageChange}
            className="p-6 bg-card text-card-foreground shadow-sm rounded-lg"
          />
        ))}
      </div>

      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 bg-card text-card-foreground shadow-sm rounded-lg">
            <AnalyticsSection categoryData={categoryData} />
          </div>
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="p-6 bg-card text-card-foreground shadow-sm rounded-lg">
            <RecentProducts 
              products={recentProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
