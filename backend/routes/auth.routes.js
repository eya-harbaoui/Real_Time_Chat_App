import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  updateProfile,
} from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/profile", upload.single("profilePic"), updateProfile);

export default router;
