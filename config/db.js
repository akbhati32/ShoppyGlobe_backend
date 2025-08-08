import mongoose from "mongoose";

// Function to connect to MongoDB
const shopDB = async () => {
  try {
    // Attempt to connect using the connection string from the .env file
    await mongoose.connect(process.env.MONGO_URI);

    console.log('DB connected successfully')
  } catch (error) {
    console.error('DB connection failed', error);
     process.exit(1);
  }
}

export default shopDB;