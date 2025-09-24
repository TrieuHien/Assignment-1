import { ProductForm } from "@/components/ProductForm";
import { Header } from "@/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiRequest } from "@/lib/utils";
import { useEffect, useState } from "react";


interface Product {
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<{ name: string; description: string; price: number; image?: string } | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const data = await apiRequest(`/api/products/${id}`);
        setProduct({ name: data.name, description: data.description, price: data.price, image: data.image });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <button 
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (productData: Product) => {
    try {
      await apiRequest(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) });
      toast.success("Product updated successfully!");
      navigate(`/product/${id}`);
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductForm 
        product={product} 
        onSubmit={handleSubmit} 
        isEditing={true}
      />
    </div>
  );
};