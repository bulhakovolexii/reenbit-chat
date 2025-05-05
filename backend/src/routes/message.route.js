import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  deleteMessage,
  getMessages,
  sendMessage,
  updateMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectedRoute);

router.get("/:chatId", getMessages);
router.post("/:chatId", sendMessage);
router.put("/:chatId/:messageId", updateMessage);
router.delete("/:chatId/:messageId", deleteMessage);

export default router;
