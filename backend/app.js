// server.js (or app.js)
import express from "express";
import cors from 'cors';
import portfolioRoutes from "./routes/portfolio-routes.js";
import userRoutes from "./routes/user-routes.js";
import adminRoutes from "./routes/admin-routes.js";
import searchRoutes from "./routes/search-routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authenticate } from "./middleware/authMiddleware.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

// Directory fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  process.env.CORS_ORIGIN_FRONTEND_URL,
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/files/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("server is running");
});

// Routes
app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1/auth/me", authenticate, (req, res) => { 
  res.status(200).json({ success: true, user: req.user});
});
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/home/searchItem", searchRoutes);
app.use("/api/v1", userRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Error Handler
app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// DB Connection
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.qofgk9v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
  app.listen(5000, () => console.log("Connected to DB and server running on port 5000"));
})
.catch(() => {
  console.log("DB connection failed!");
});
