import { Edit, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  status: 'Draft' | 'Published';
  description: string;
  imageUrl: string;
}

interface RecentProductsProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RecentProducts = ({ products, onEdit, onDelete }: RecentProductsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Recent Products</h2>
      
      <div className="overflow-y-auto max-h-96">
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products added yet
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="border border-gray-200 rounded-lg p-4 flex items-start hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex space-x-2">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        product.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.status}
                      </span>
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => onEdit(product.id)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="p-1 text-red-600 hover:text-red-800 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentProducts;
