import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { apiRequest } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const initialQ = new URLSearchParams(window.location.search).get('q') || '';
        if (initialQ && query !== initialQ) {
          setQuery(initialQ);
        }
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        const effectiveQ = initialQ || query;
        if (effectiveQ) params.set('q', effectiveQ);
        const data = await apiRequest<{ items: Product[]; total: number; page: number; limit: number }>(`/api/products?${params.toString()}`);
        setProducts(data.items);
        setTotal(data.total);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, limit, query]);

  const handleDeleteProduct = async (id: string) => {
    try {
      await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p._id === id ? false : true));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <section className="container mx-auto py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of premium clothing
            </p>
          </div>
          <Link to="/add-product">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => { setPage(1); setQuery(e.target.value); }}
            placeholder="Search products..."
            className="w-full md:w-80 rounded-md border px-3 py-2"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{ id: product._id, name: product.name, description: product.description, price: product.price, image: product.image }}
              onDelete={handleDeleteProduct}
              showActions={true}
            />
          ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products available yet.</p>
            <Link to="/add-product">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {Math.max(1, Math.ceil(total / limit))}
          </span>
          <Button variant="outline" disabled={page >= Math.max(1, Math.ceil(total / limit))} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
