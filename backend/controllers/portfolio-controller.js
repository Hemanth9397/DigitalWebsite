import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HttpError from "../models/http-error.js";
import fs from "fs";
import { Portfolio } from "../models/portifolio.js";

// These two lines recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projects = [
  {
    title: "MERN Ecommerce",
    description:
      "Full-featured eCommerce site using MongoDB, Express, React, Node.js.",
    link: "https://github.com/Hemanth9397/DigitalWebsite",
  },
  {
    title: "Blog App",
    description:
      "Blog platform with user authentication, CRUD and rich text editor.",
    link: "https://github.com/Hemanth9397/DigitalWebsite",
  },
];

const skills = [
  "JavaScript",
  "React",
  "Redux",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Ant Design",
  "Git",
  "REST APIs",
];


 const getDownloadPDF = (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "../files",
    "Frontend@HemanthGidijala.pdf"
  );

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return next(new HttpError("File not found.", 404));
    }

    res.download(filePath, "Frontend@HemanthGidijala.pdf", (err) => {
      if (err) {
        return next(new HttpError("File download failed.", 500));
      }
    });
  });
};

 const getPortfolioDetails = async(req, res, next) => {
  try{
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
};

export default {getDownloadPDF, getPortfolioDetails};

