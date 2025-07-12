import express from "express";
import cors from 'cors';
import portfolioRoutes from "./routes/portfolio-routes.js";
import UserRoutes from "./routes/user-routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authenticate from "./middleware/authMiddleware.js";
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [process.env.CORS_ORIGIN_FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ✅ MUST be true to allow sending cookies
}));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/files/uploads', express.static('uploads'));


app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1", UserRoutes);
//app.use("/api/v1",authenticate, UserRoutes);

// 404 handler (keep this at the very bottom)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });

});


mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.qofgk9v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
