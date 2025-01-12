import { Server } from "socket.io";
import http from "http";
import express from "express";
//create an express app
const app = express();
//create a http server
const server = http.createServer(app);
//create a socket.io server and attached to the http server (only get ,post requests from the frontend are allowed)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {}; // {userId: socketId}

//io.on : listen to global events (for example new user connection)
io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);
  const userId = socket.handshake.query.userId; // get the userId from the query string
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on : listen to events after a specific user is connected(for example the disconnection)
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, io, server };
