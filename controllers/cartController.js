import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

// Fetch all items in the user's cart
export const fetchCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate('product');

    // If no items found, return 404
    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    // Return cart items
    res.status(200).json({ message: 'List of all cart items', cartItems });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Add a product to the cart
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    if (!productId) return res.status(400).json({ message: 'ProductId not provided' });

    // Find the product in the database
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if the product (ID) already exists in the user's cart
    const existing = await Cart.findOne({ user: req.user.id, product: productId });
    if (existing) {
      // If quantity is within stock limit, increment it
      if (existing.quantity < product.stock)
        existing.quantity += quantity;
      else return res.status(400).json({ message: 'Stock limit reached' });
      await existing.save();
      return res.json(existing);
    }

    // If item is not in cart, create new cart entry
    const newItem = await Cart.create({
      user: req.user.id,
      product: product.id,
      quantity
    });

    return res.status(201).json({ message: 'Item successfully added to the Cart', newItem });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Update the quantity of an item in the cart
export const updateCartItem = async (req, res, next) => {
  const { quantity } = req.body;

  try {
    // Update the quantity for the specified product in user's cart
    const item = await Cart.findOneAndUpdate(
      { user: req.user.id, product: req.params.productId },
      { quantity },
      { new: true }
    );

    // If item not found
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    res.status(200).json({ message: 'Item successfully updated', quantity: item.quantity })
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Remove a single item from the cart
export const removeCartItem = async (req, res, next) => {
  try {
    // Delete the item from the user's cart
    const deleted = await Cart.findOneAndDelete({
      user: req.user.id,
      product: req.params.productId
    });

    if (!deleted) return res.status(404).json({ message: 'Item not found in cart' });

    res.status(200).json({ message: 'Item successfully removed' });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Empty the entire cart for the user
export const emptyCart = async (req, res, next) => {
  try {
    // Delete all cart items for the user
    const result = await Cart.deleteMany({
      user: req.user.id
    });

    // If nothing was deleted (already empty)
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart already empty' });
    }

    res.status(200).json({ message: 'Cart is empty now' });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}