import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId).select("-password"); // attach user without password

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; 
    next();         
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

export const isApprovedUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.user.status !== "approved") {
    return res.status(403).json({ message: "Account not approved yet" });
  }
  next();
};



export default {authenticate, isAdmin, isApprovedUser};
