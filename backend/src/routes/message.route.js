import express from "express";
import {
  deleteMessage,
  getLastMessage,
  getMessages,
  sendMessage,
  updateMessage,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/:chatId", getMessages);

router.get("/:chatId/last", getLastMessage);

router.post("/:chatId", sendMessage);

router.put("/:chatId/:messageId", updateMessage);

router.delete("/:chatId/:messageId", deleteMessage);

export default router;
