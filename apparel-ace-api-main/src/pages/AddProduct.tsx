import { ProductForm } from "@/components/ProductForm";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiRequest } from "@/lib/utils";

interface Product {
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (product: Product) => {
    try {
      await apiRequest('/api/products', { method: 'POST', body: JSON.stringify(product) });
      toast.success("Product created successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to create product. Please try again.");
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};