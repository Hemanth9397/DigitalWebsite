const express = require("express");
const cors = require("cors");
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

// app.use((req, res, next

// app.use((req, res, next) => {
//   console.log("This is middleware");
//   next();
// });

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/api/entries", (req, res) => {
  res.json(entries);
});

app.listen(5000, () => {
  console.log("serve is running on server");
});
