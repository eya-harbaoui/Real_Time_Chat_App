import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file, folder) => {
  return new Promise((resolve, reject) => {
    // Determine if the file should be handled as a document
    const isDocument =
      file.mimetype === "application/pdf" ||
      file.mimetype.includes("msword") ||
      file.mimetype.includes("officedocument") ||
      file.mimetype.includes("text/") ||
      file.mimetype.includes("application/vnd.");

    // Set resource type based on file type
    let resourceType = "auto";
    if (file.mimetype.startsWith("audio/")) {
      resourceType = "video"; // Use 'video' for audio files in Cloudinary
    } else if (isDocument) {
      resourceType = "raw";
    }

    const uploadOptions = {
      folder,
      resource_type: resourceType,
      format: file.mimetype.startsWith("audio/") ? "mp3" : undefined, // Convert audio to MP3
      flags: isDocument ? "attachment" : undefined, // Only attach for documents
      overwrite: true,
      public_id: `${folder}/${Date.now()}`,
      use_filename: true,
      unique_filename: true,
      type: "upload", // Ensure the file is public
    };

    // Log the upload attempt for debugging
    console.log("Attempting upload to Cloudinary:", {
      fileType: file.mimetype,
      fileSize: file.size,
      resourceType,
      uploadOptions,
    });

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error Details:", {
            error,
            fileType: file.mimetype,
            fileSize: file.size,
            resourceType,
          });
          reject(error);
        } else {
          // Generate a download URL for documents
          if (isDocument) {
            result.secure_url = cloudinary.url(result.public_id, {
              resource_type: "raw",
              flags: "attachment",
            });
          }
          console.log("Cloudinary Upload Success:", result);
          resolve(result);
        }
      }
    );

    // Create a readable stream from the buffer
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(stream);
  });
};

export default uploadToCloudinary;
