import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileTypeValidator } from "../utils/fileTypeValidator.js";
import { UNEXPECTED_FILE_TYPE } from "../constants/file.js";

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const uploadDir = path.join(__dirname, "uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const isFileTypeAllowed = fileTypeValidator(file);
    if (isFileTypeAllowed) {
      return cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          UNEXPECTED_FILE_TYPE.code,
          UNEXPECTED_FILE_TYPE.message
        )
      );
    }
  },
}).single("file");

// Route to handle file upload
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err.message });
    } else if (err) {
      res.status(500).json({ message: "Server error occurred" });
    } else {
      res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
    }
  });
});

export default upload;
