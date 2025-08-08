import express from 'express';
import { 
  addProduct, fetchAllProducts, fetchProductById, updateProduct, deleteProduct
} from "../controllers/productController.js";

// Create a new Express router instance for product routes
const productRouter = express.Router();

// Add a new product
productRouter.post('/', addProduct);

// Fetch all products
productRouter.get('/', fetchAllProducts);

// Fetch a product by its ID
productRouter.get('/:id', fetchProductById);

// Update an existing product by ID
productRouter.put('/:id', updateProduct);

// Delete a product by ID
productRouter.delete('/:id', deleteProduct);

export default productRouter;