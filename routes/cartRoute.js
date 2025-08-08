import express from 'express';
import { 
  fetchCart, addToCart, updateCartItem, removeCartItem, emptyCart
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

// Create a new router for cart-related operations
const cartRouter = express.Router();

// Apply authentication middleware to all routes in this router
cartRouter.use(protect);

// Fetch all items in the user's cart
cartRouter.get('/', fetchCart);

// Add an item to the user's cart
cartRouter.post('/', addToCart);

// Update quantity of a specific cart item
cartRouter.put('/:productId', updateCartItem);

// Remove a specific item from the cart
cartRouter.delete('/:productId', removeCartItem);

// Empty the entire cart
cartRouter.delete('/', emptyCart);

export default cartRouter;