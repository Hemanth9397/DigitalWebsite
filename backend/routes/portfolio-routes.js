import express from "express";
import portfolioController from "../controllers/portfolio-controller.js";
const router = express.Router();

router.get("/", portfolioController.getPortfolioDetails);

router.post("/", portfolioController.postPortfolioDetails);

router.get("/download-pdf", portfolioController.getDownloadPDF);

export default router;
