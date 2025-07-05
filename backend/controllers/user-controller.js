import { User } from "../models/user.js";
import HttpError from "../models/http-error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'your_jwt_secret';

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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    return next(new HttpError("Wrong Creditial", 403));
  }
};

export default { postSignup, postLogin };
