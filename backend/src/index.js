import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
  connectDB();
});
