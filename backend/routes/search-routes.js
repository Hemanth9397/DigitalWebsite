import express from "express";
import searchItemController from "../controllers/search-controller.js";

const router = express.Router();

router.get("/", searchItemController.getSearchItems);

export default router;



