import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import ImagePreview from '../components/products/ImagePreview';
import { useProducts } from '../context/ProductContext';

const AddProduct = () => {
  const { addProduct, uploadImage, loading, error } = useProducts();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleImageUpload = async (file: File) => {
    setProductImage(file);
    try {
      const uploadedImageUrl = await uploadImage(file);
      setImageUrl(uploadedImageUrl);
    } catch (err) {
      console.error('Failed to upload image:', err);
    }
  };
  
  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      // Combine form data with image URL
      const productData = {
        ...data,
        imageUrl: imageUrl
      };
      
      await addProduct(productData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add product:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductForm 
            onSubmit={handleSubmit} 
            isSubmitting={submitting || loading}
          />
        </div>
        <div>
          <ImagePreview onImageUpload={handleImageUpload} />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
