import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../lib/api';

// Create context
const ProductContext = createContext();

// Context provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (productData) => {
    setLoading(true);
    try {
      const newProduct = await api.createProduct(productData);
      setProducts([...products, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing product
  const updateProduct = async (id, productData) => {
    setLoading(true);
    try {
      const updatedProduct = await api.updateProduct(id, productData);
      setProducts(
        products.map((product) => 
          product.id === id ? updatedProduct : product
        )
      );
      setError(null);
      return updatedProduct;
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await api.deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Upload an image
  const uploadImage = async (file) => {
    setLoading(true);
    try {
      const data = await api.uploadImage(file);
      setError(null);
      return data.imageUrl;
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Context value
  const value = {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext;
