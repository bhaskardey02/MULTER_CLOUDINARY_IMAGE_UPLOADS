import express from "express";
import path from "path";
import fs from "fs";
import { fileRouter } from "./src/router/fileRouter.js"; // Ensure this uses .js for ES Modules
import cors from "cors";
// Get the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const PORT = process.env.PORT || 4040;

// Resolve directory paths
const uploadDir = path.join(__dirname, "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware to serve static files
app.use(cors());
app.use("/uploads", express.static(uploadDir));
app.use("/files", fileRouter);

// Route definition
app.get("/", (req, res) => {
  res.send("Welcome to file/image upload");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
