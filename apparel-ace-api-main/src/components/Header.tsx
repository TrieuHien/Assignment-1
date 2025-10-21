import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Home, Package, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const { token, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-4 flex items-center space-x-2 lg:mr-6" to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 w-6"
              onError={(e) => {
                // fallback to icon if logo.png missing
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="hidden font-bold sm:inline-block">FASHION</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              to="/"
            >
              <Home className="h-4 w-4" />
            </Link>
            {/* Removed add-product plus icon */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.target as HTMLInputElement).value.trim();
                    const url = q ? `/?q=${encodeURIComponent(q)}` : '/';
                    window.location.href = url;
                  }
                }}
                defaultValue={new URLSearchParams(window.location.search).get('q') || ''}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!token ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/manage-products">
                  <Button variant="ghost" size="sm">
                    <Package className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="ghost" size="sm">
                    Orders
                  </Button>
                </Link>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="h-4 w-4" />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>Sign Out</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};