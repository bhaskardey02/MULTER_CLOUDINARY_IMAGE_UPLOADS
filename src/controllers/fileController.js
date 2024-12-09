import { cloudinaryUpload } from "../service/fileService.js";

export const fileController = async (req, res) => {
  try {
    // Check if files are provided in the request
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: { description: "No file uploaded." } });
    }

    // Process the first file (assuming single file upload)
    const file = req.files[0];

    // Upload the file to Cloudinary
    const response = await cloudinaryUpload(file);

    // Send success response
    res.status(200).json({
      message: "File uploaded successfully",
      uploadResult: response,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};
