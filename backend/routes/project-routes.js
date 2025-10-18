import express from "express";
import { getProjects } from "../controllers/project-controller.js";

const router = express.Router();

router.get("/", getProjects);

export default router;
