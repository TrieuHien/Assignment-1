import { Schema, model } from 'mongoose';

export interface ProductDocument {
  name: string;
  description: string;
  price: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

const Product = model<ProductDocument>('Product', ProductSchema);

export default Product;


