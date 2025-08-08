// Import core modules
import express from 'express';
import dotenv from 'dotenv';

// Import custom modules
import shopDB from './config/db.js';          // MongoDB connection
import authRouter from './routes/authRoute.js';   // Optional seed data function

// Import route handlers
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import fetchAndSeedData from './config/seedData.js';

// Import custom middlewares
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Connect to the MongoDB database
shopDB();
// Seed data only in development mode
if (process.env.NODE_ENV === 'development') fetchAndSeedData();

// Route setup
app.use('/', authRouter);     // Authentication routes (login, register)
app.use('/products', productRouter);    // Product-related routes
app.use('/cart', cartRouter);   // Cart-related routes

// Error handling middleware
app.use(notFound);       // For undefined routes
app.use(errorHandler);   // For all other errors

// Define port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
});

