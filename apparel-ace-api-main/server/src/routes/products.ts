import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

// GET /api/products - list all products with optional search and pagination
router.get('/', async (req, res) => {
  const { q, page = '1', limit = '8' } = req.query as { q?: string; page?: string; limit?: string };
  const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit as string, 10) || 12, 1), 100);

  const filter = q
    ? {
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({ items, total, page: pageNum, limit: limitNum });
});

// GET /api/products/:id - get single product
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products - create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    // eslint-disable-next-line no-console
    console.log('POST /api/products payload:', req.body);
    const numericPrice = Number(price);
    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'name, description, and price are required' });
    }
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'price must be a non-negative number' });
    }
    const product = await Product.create({ name, description, price: numericPrice, image });
    res.status(201).json(product);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create product error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create product';
    res.status(500).json({ message });
  }
});

// PUT /api/products/:id - update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    const numericPrice = price === undefined ? undefined : Number(price);
    if (numericPrice !== undefined && (Number.isNaN(numericPrice) || numericPrice < 0)) {
      return res.status(400).json({ message: 'price must be a non-negative number' });
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price: numericPrice, image },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;

