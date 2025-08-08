import mongoose from "mongoose";

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  // Product name: required and trimmed
  name: {
    type: String,
    required: [true, 'Product name is required!'],
    trim: true
  },

  // Product price: must be non-negative and required
  price: {
    type: Number,
    required: [true, 'Product price is required!'],
    min: [0, 'Price cannot be negative!']
  },

  // Optional product description, default is empty string
  description: {
    type: String,
    default: '',
    trim: true
  },

  // Product stock: required, default 0, and cannot be negative
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative!']
  },
},
{timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;