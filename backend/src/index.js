import express from "express";
import { config } from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
config();

import { connectDB } from "./lib/db.js";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import friendRoute from "./routes/friend.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieparser());

// finish signing in

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/friends", friendRoute);

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) console.error(err);
  else {
    console.log("Server started on port:", process.env.SERVER_PORT);
    connectDB();
  }
});
