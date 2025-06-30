import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import ConnectedDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';

// Import Routes
import sellerRouter from './routes/sellerRoute.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
await ConnectedDB();
await connectCloudinary();

// CORS Setup
const allowedOrigins = ['http://localhost:5173']; // Add deployed frontend here later

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get('/', (req, res) => res.send('API is working'));

// API Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
