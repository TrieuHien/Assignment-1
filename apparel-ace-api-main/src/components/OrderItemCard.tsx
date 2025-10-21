import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderItemCardProps {
  item: OrderItem;
}

export const OrderItemCard = ({ item }: OrderItemCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className="text-xs">No image</div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-base font-bold">
              ${item.price.toFixed(2)} each
            </Badge>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

