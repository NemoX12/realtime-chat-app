import express from "express";

import protectedRoute from "../middleware/protectedRoute.js";
import {
  checkAuth,
  logout,
  signIn,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/check", protectedRoute, checkAuth);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);

router.put("/update-profile", protectedRoute, updateProfile);

export default router;
