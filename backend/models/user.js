import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",  // by default regular user
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // after signup, user is pending approval
  },
});

export const User = mongoose.model("User", userSchema);
