import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./lib/db.js";
import setupWebSocket from "./lib/websocket.js";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();
const server = createServer(app);

// Constants
const PORT = process.env.PORT;

// WebSocket setup
const wsServer = setupWebSocket(server);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);
app.use((req, res, next) => {
  req.wsServer = wsServer;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
