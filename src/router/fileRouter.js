import multer from "multer";
import { Router } from "express";
import upload from "../middleware/fileUpload.js";
import { UNEXPECTED_FILE_TYPE } from "../constants/file.js";
import { fileController } from "../controllers/fileController.js";
import { imageResize } from "../middleware/imageResize.js";
import { isFilePresent } from "../middleware/validators/isFilePresent.js";
import { authenticateJWT } from "../middleware/authentication.js";

const fileRouter = Router();

fileRouter.post(
  "/upload",
  authenticateJWT, // Ensures the user is authenticated before proceeding
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle specific Multer errors
        if (err.code === UNEXPECTED_FILE_TYPE.code) {
          return res
            .status(400)
            .json({ error: { description: UNEXPECTED_FILE_TYPE.message } });
        }
        return res.status(500).json({ error: { description: err.message } });
      } else if (err) {
        // Handle any other general errors
        return res.status(500).json({ error: { description: err.message } });
      }
      next(); // Proceed to the next middleware if no errors
    });
  },
  imageResize, // Resize the image if needed
  isFilePresent, // Validate the file is present and meets requirements
  fileController // Final handler to upload the file to Cloudinary or process it further
);

export { fileRouter };
