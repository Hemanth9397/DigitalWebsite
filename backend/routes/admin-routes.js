import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import adminController from "../controllers/admin-controller.js";

const router = express.Router();

router.get("/users", authenticate, adminController.getAllUsers);
router.put("/users/approve/:id", authenticate, adminController.approveUser);
router.delete("/users/:id", authenticate, adminController.deleteUser);

export default router;
