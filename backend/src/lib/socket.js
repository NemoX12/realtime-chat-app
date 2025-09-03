import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: ["http://localhost:5173"],
});

export const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId);
};

const userSocketMap = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
  }

  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    userSocketMap.delete(userId);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { io, app, server };
