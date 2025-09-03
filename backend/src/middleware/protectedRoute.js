import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ error: "Unauthorized - No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  if (!decoded) {
    return res.status(403).json({ error: "Unauthorized - Invalid token provided" });
  }

  const user = await User.findById(decoded.userId);

  if (!user) {
    return res.status(403).json({ error: "User not found" });
  }

  req.user = user;

  next();
};

export default protectedRoute;
