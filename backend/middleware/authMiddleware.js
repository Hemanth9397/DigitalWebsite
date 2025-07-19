import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId).select("_id");

    if (!user) return res.status(401).json({ message: "User not found" });

    return res.status(200).json({ user: user});
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export default authenticate;
