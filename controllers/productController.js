import Product from "../models/ProductModel.js";

// Fetch all products from the database
export const fetchAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    // If no products exist, return 404
    if (products.length === 0) {
      return res.status(404).json({ message: 'Add some products!' });
    }

    // Return the list of products
    res.status(200).json({ message: 'List of all products', products });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Fetch a single product by ID
export const fetchProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // If not found, send 404
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    // Return product
    res.status(200).json(product);
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Add a new product
export const addProduct = async (req, res, next) => {
  try {
    // Create a new product using request body
    const product = await Product.create(req.body);

    // Return the newly added product
    return res.status(201).json({ message: 'Product added successfully', product })
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Update a product by ID
export const updateProduct = async (req, res, next) => {
  try {
    // Update the product and return the updated document
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // If product not found
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the updated product
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}

// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
  try {
    // Delete the product by ID
    const product = await Product.findByIdAndDelete(req.params.id);

    // If not found, return 404
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);    // Pass to error handler
  }
}