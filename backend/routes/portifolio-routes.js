import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// These two lines recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

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

router.get("/", (req, res, next) => {
  res.json([{ message: "success",name: "Hemanth Gidijala", shortNote: "Full Stack Developer passionate about building modern web applications with React, Node.js, and AWS.", aboutMe: "I have 5+ years of experience in software development. I specialize in building scalable web applications and have strong experience in both frontend and backend technologies including React, Redux, Node.js, Express, MongoDB, PostgreSQL, and AWS services like S3, Lambda, and CloudFront.", projects, skills }]);
});

router.get("/download-pdf", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../files",
    "Frontend@HemanthGidijala.pdf"
  );
  res.download(filePath, "Frontend@HemanthGidijala.pdf", (err) => {
    if (err) {
      console.error("Error during file download:", err);
      res.status(500).send("File not found or internal error.");
    }
  });
});

export default router;
