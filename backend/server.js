//packages imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//files imports
import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import usersRouters from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

//variables
const PORT = process.env.PORT || 5000;
//config call
dotenv.config();

//middlewares (app.use to apply middlewares globally : should be declared before routes def)
app.use(express.json()); // parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());
// Alternatively, you can specify allowed origins:
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only requests from this origin
    credentials: true, // Allow sending cookies with the request
  })
);
app.get("/", (req, res) => {
  //root route
  res.send("Server is ready !");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", usersRouters);

// Run the server on port 5000 and connect to mongoDB
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
