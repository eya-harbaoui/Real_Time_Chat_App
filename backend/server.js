//packages imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
//files imports
import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import usersRouters from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";
//variables
//config call
dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

//middlewares (app.use to apply middlewares globally : should be declared before routes def)
app.use(express.json()); // parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your frontend URL
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", usersRouters);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
