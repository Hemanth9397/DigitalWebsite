import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio-routes.js";
import UserRoutes from "./routes/user-routes.js";
import mongoose from "mongoose";



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/files/uploads', express.static('uploads'));


app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1", UserRoutes);

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
    `mongodb+srv://Hemanth:${"G8kFA6c11FD0Ao3I"}@cluster0.qofgk9v.mongodb.net/digitalWebsiteDB?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
