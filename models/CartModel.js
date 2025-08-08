import mongoose from "mongoose";

// Define the schema for cart items
const cartSchema = new mongoose.Schema({
  // Reference to the User who owns this cart item
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reference to the Product added to the cart
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  // Quantity of the product in the cart
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
},
{timestamps: true});

// Create a compound index to ensure a user can't add the same product twice
cartSchema.index({ user: 1, product: 1 }, { unique: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;