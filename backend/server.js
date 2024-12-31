//packages imports
import express from "express";
import dotenv from "dotenv";
//files imports
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
//variables
const app = express();
const PORT = process.env.PORT || 5000;
//config call
dotenv.config();

//middlewares
app.use(express.json()); // parse the incoming requests with JSON payloads(from req.body)
app.get("/", (req, res) => {
  //root route
  res.send("Server is ready !");
});

app.use("/api/auth", authRoutes);

// Run the server on port 5000 and connect to mongoDB
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
