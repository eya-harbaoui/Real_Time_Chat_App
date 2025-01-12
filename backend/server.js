//packages imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
//files imports
import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import usersRouters from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

//variables
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
//config call
dotenv.config();

//middlewares (app.use to apply middlewares globally : should be declared before routes def)
app.use(express.json()); // parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());
// Alternatively, you can specify allowed origins:

app.get("/", (req, res) => {
  //root route
  res.send("Server is ready !");
});

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
