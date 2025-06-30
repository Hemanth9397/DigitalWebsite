import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio-routes.js";
import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://Hemanth:${"G8kFA6c11FD0Ao3I"}@cluster0.qofgk9v.mongodb.net/`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/portfolio", portfolioRoutes);

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

app.listen(5000);
