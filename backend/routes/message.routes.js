import express from "express";
import {
  sendMessage,
  receiveMessage,
} from "../controllers/message.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();
router.post("/send/:id", protectRoute, upload.single("file"), sendMessage);
router.get("/get/:id", protectRoute, receiveMessage);

export default router;
