import express from "express";
import {
  deleteMessage,
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsers);
router.post("/get-messages", protectedRoute, getMessages);

router.post("/send-message", protectedRoute, sendMessage);

router.delete("/delete-message", protectedRoute, deleteMessage);

export default router;
