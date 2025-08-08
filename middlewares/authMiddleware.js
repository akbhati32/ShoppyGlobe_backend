import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Middleware to protect routes — verifies JWT token and attaches user to request
export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to req (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  } else {
    // No token provided
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
