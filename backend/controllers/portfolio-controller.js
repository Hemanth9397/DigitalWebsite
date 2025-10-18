import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HttpError from "../models/http-error.js";
import fs from "fs";
import { Portfolio } from "../models/portifolio.js";

// These two lines recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getDownloadPDF = (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "../files",
    "FullStack@HemanthGidijala.pdf"
  );

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return next(new HttpError("File not found.", 404));
    }

    res.download(filePath, "FullStack@HemanthGidijala.pdf", (err) => {
      if (err) {
        return next(new HttpError("File download failed.", 500));
      }
    });
  });
};

const getPortfolioDetails = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne();

    if (!portfolio) {
      return next(new HttpError("No portfolio found", 404));
    }
    res.status(200).json(portfolio);
  } catch (err) {
    return next(
      new HttpError("Internal Server Issue. Try some other time.", 500)
    );
  }
};

const postPortfolioDetails = async (req, res, next) => {
  try {
    await Portfolio.findOneAndUpdate(
      {}, // find any existing document (only one allowed)
      { $set: req.body }, // update with request data
      { new: true, upsert: true } // create if not exists
    );
    res.status(201).json({ message: "Portfolio saved!" });
  } catch (error) {
    return next(new HttpError("Error saving portfolio. Try later.", 500));
  }
};


export default {
  getDownloadPDF,
  getPortfolioDetails,
  postPortfolioDetails
};
