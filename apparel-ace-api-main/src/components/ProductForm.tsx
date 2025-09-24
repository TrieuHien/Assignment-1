import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  isEditing?: boolean;
}

export const ProductForm = ({ product, onSubmit, isEditing = false }: ProductFormProps) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || ''
  });

  // Sync form data when product prop changes (edit flow)
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        image: product.image || ''
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isEditing ? 'Update your product information' : 'Create a new product for your store'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Product Details' : 'New Product'}</CardTitle>
          <CardDescription>
            Fill in the information below to {isEditing ? 'update' : 'create'} your product.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your product"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Provide a URL to an image for your product
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Product' : 'Create Product'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};