import express from 'express';
import cors from 'cors';
import portfolioRoutes from './routes/portfolio-routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/portfolio",portfolioRoutes);


// Error handler
app.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "An unknown error occurred!"});
});

app.listen(5000);
