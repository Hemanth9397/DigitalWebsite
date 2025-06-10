import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import portifolioRoutes from './routes/portifolio-routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const entries = [
  { id: 1, title: "Entry 1", content: "This is entry 1" },
  { id: 2, title: "Entry 2", content: "This is entry 2" },
  { id: 3, title: "Entry 3", content: "This is entry 3" },
];

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/portifolio",portifolioRoutes);

app.get("/about", (req, res) => {
  setTimeout(()=>{
    return res.status(200).json(entries);
  }, 1000);
  
});

app.listen(5000, () => {
  console.log("server is running on server");
});
