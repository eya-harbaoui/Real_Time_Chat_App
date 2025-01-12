// message.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "audio", "video", "pdf", "document"],
      required: true,
      default: "text",
    },
    message: {
      type: String,
      required: function () {
        return this.messageType === "text";
      },
    },
    fileUrl: {
      type: String,
      required: function () {
        return this.messageType !== "text";
      },
    },
    fileName: {
      type: String,
      required: function () {
        return this.messageType !== "text";
      },
    },
    fileType: {
      type: String,
      required: function () {
        return this.messageType !== "text";
      },
    },
    fileSize: {
      type: Number,
      required: function () {
        return this.messageType !== "text";
      },
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
