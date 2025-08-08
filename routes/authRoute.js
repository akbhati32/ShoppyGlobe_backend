import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

// Create a new router instance for authentication routes
const authRouter = express.Router();

// Register a new user
authRouter.post('/register', registerUser);

// Authenticate user and return a token
authRouter.post('/login', loginUser);

export default authRouter;