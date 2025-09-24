import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2, ShoppingCart, Package } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { apiRequest } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const data = await apiRequest<Product>(`/api/products/${id}`);
        setProduct(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!loading && !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!product) return;
    if (window.confirm('Are you sure you want to delete this product?')) {
      await apiRequest(`/api/products/${product._id}`, { method: 'DELETE' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                {product?.image ? (
                  <img
                    src={product.image}
                    alt={product?.name || 'Product image'}
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Package className="h-16 w-16" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
              <Badge variant="secondary" className="text-xl font-bold px-4 py-2">
                ${product?.price.toFixed(2)}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-lg">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="space-y-4">
              <Button className="w-full" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link to={`/edit-product/${product._id}`}>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Product
                  </Button>
                </Link>
                
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  className="w-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Product
                </Button>
              </div>
            </div>

            {/* Removed Product Information section as requested */}
          </div>
        </div>
      </div>
    </div>
  );
};