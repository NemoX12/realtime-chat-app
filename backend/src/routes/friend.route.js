import express from "express";
import {
  deleteFriend,
  getFriendRequests,
  getFriends,
  manageFriendRequest,
  sendFriendRequest,
} from "../controllers/friend.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/friends", protectedRoute, getFriends);
router.get("/requests", protectedRoute, getFriendRequests);

router.post("/send-request", protectedRoute, sendFriendRequest);
router.post("/manage-request", protectedRoute, manageFriendRequest);

router.delete("/delete-friend", protectedRoute, deleteFriend);

export default router;
