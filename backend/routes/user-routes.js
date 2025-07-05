import express from "express";
import fs from "fs";
import userController from "../controllers/user-controller.js";
import multer from "multer";
import path from 'path';


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(process.cwd(), '/files/uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

router.post('/signup', upload.single('image'), userController.postSignup);
router.post('/login', multer().none(), userController.postLogin);

export default router;