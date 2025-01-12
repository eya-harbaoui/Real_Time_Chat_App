// middleware/multer.js
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // Increased to 25MB limit
  },
  // Removing the fileFilter to accept all file types
});
