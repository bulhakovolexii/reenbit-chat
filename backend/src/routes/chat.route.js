import express from "express";

import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  createChat,
  deleteChat,
  getAllChats,
  updateChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/", getAllChats);
router.post("/", createChat);
router.put("/:chatId", updateChat);
router.delete("/:chatId", deleteChat);

export default router;
