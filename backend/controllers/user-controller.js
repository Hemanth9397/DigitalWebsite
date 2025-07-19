import { User } from "../models/user.js";
import HttpError from "../models/http-error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";


const postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const image = req.file?.path;

  if (!name || !email || !password || !image) {
    return next(new HttpError("All fields are required", 400));
  }
  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return next(new HttpError("Email already exists.", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, image });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return next(new HttpError("Server error", 500));
  }
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HttpError("All fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new HttpError("Invalid credentials", 401));

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "15m",
    });

     // Set the token as an HttpOnly cookie
    res.cookie('access_token', token, {
      httpOnly: true,        // Can't be accessed by JavaScript
      secure: isProduction,  // Only for HTTPS in production
      sameSite: isProduction ? "None" : "Lax",
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.status(200).json({ message: "Login successful", user: user["_id"] });
  } catch (err) {
    return next(new HttpError("Wrong Creditial", 403));
  }
};

 const postLogout =(req, res) => {
  res.clearCookie('access_token',{
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: '/', // 👈 this is where you define the path
  maxAge: 15 * 60 * 1000, // 15 min
});
  res.json({ message: 'Logged out' });
};

export default { postSignup, postLogin, postLogout};
