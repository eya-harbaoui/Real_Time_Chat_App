import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    console.log("Request file:", req.file);
    console.log("Request body:", req.body);

    if (!req.file && !req.body.message) {
      throw new Error("No file or message provided");
    }

    const receiverId = req.params.id;
    const senderId = req.user._id;
    let messageData = {
      messageType: "text",
      message: req.body.message,
    };

    if (req.file) {
      const mimeType = req.file.mimetype.toLowerCase();
      console.log("File mime type:", mimeType);

      let messageType;

      // Determine message type based on MIME type
      if (mimeType.startsWith("image/")) {
        messageType = "image";
      } else if (mimeType.startsWith("audio/")) {
        messageType = "audio";
        // Add specific handling for audio files
        if (req.file.size > 15 * 1024 * 1024) {
          // 15MB limit for audio
          throw new Error("Audio file size exceeds limit of 15MB");
        }
      } else if (mimeType.startsWith("video/")) {
        messageType = "video";
      } else if (mimeType === "application/pdf") {
        messageType = "pdf";
      } else if (
        mimeType.includes("msword") ||
        mimeType.includes("officedocument") ||
        mimeType.includes("text/") ||
        mimeType.includes("application/vnd.")
      ) {
        messageType = "document";
      } else {
        throw new Error(`Unsupported file type: ${mimeType}`);
      }

      try {
        console.log("Attempting to upload file to Cloudinary...");
        const uploadResult = await uploadToCloudinary(
          req.file,
          "chat_attachments"
        );
        console.log("Cloudinary upload result:", uploadResult);
        messageData = {
          messageType,
          fileUrl: uploadResult.secure_url,
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
        };
      } catch (cloudinaryError) {
        console.error("Detailed Cloudinary upload error:", {
          error: cloudinaryError,
          file: {
            type: req.file.mimetype,
            size: req.file.size,
            name: req.file.originalname,
          },
        });
        throw new Error(`File upload failed: ${cloudinaryError.message}`);
      }
    }

    // Continue with creating/updating conversation and message
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      ...messageData,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await Promise.all([conversation.save(), newMessage.save()]);

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Full error in sending message controller:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//******************receiveMessage controller***********************************

export const receiveMessage = async (req, res) => {
  try {
    //get the user to chat with id from the req params
    const userToChatId = req.params.id;
    //get the user id from the request user key (added by the middleware  : protectRoute)
    const receiverId = req.user._id;
    //get the conversation infos between those users and get the messages texts by using populate(similar to join in sql)
    const conversation = await Conversation.findOne({
      participants: { $all: [userToChatId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
