import express from "express";
import {
  createChat,
  deleteChat,
  getAllChats,
  updateChat,
} from "../controllers/chat.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/", getAllChats);

router.post("/", createChat);

router.put("/:chatId", updateChat);

router.delete("/:chatId", deleteChat);

export default router;
