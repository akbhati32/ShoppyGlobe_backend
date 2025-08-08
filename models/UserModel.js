import mongoose from "mongoose";

// Define schema for User model
const userSchema = new mongoose.Schema({
  // Username: required and trimmed
  name: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true
  },

  // Email: required, unique, lowercase, trimmed, and pattern validated
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,     // Ensures no duplicate emails
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a vaild email address!'
    ]
  },

  // Password: required, minimum length of 6
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minlength: [6, 'Password must be 6 characters long!']
  }
}, 
{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;