import Product from "../models/ProductModel.js";

// function to fetch product data and upload it to MongoDB
const fetchAndSeedData = async () => {
  try {

    // fetching the product data from dummyjson
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    // Transforming product data using map to match product schema
    const formattedProducts = data.products.map(product => ({
      name: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock
    }));

    // clearing the product and uploading the seed data into MongoDB
    await Product.deleteMany({});
    await Product.insertMany(formattedProducts);
    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
};

export default fetchAndSeedData;
