import mongoose from "mongoose";

// For simple category strings
const searchSchema = new mongoose.Schema({
  category: [String],  // matches your MongoDB Atlas field
  createdAt: { type: Date, default: Date.now }
});

// Export model and specify collection name if needed
export const Search = mongoose.model('Search', searchSchema, 'search'); // 'search' = exact collection name
