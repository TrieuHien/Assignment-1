import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsRouter from './routes/products';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/products', productsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/apparel_ace';

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;


