import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const getAllChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredChats = await Chat.find({ userId: loggedInUserId }).sort({
      updatedAt: -1,
    });

    if (filteredChats.length < 1) {
      return res.status(404).json({ message: "Chats not found" });
    }

    res.status(200).json(filteredChats);
  } catch (error) {
    console.log("Error in getAllChats controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createChat = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const chat = await Chat.create({
      firstName,
      lastName,
      userId: req.user._id,
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log("Error in createChat controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const filter = { _id: req.params.chatId, userId: req.user._id };
    const update = { firstName, lastName };
    const options = { returnOriginal: false };

    const chat = await Chat.findOneAndUpdate(filter, update, options);

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json(chat);
  } catch (error) {
    console.log("Error in updateChat controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const filter = { _id: req.params.chatId, userId: req.user._id };

    const chat = await Chat.findOneAndDelete(filter);

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await Message.deleteMany({ chatId: chat._id }); // Delete all messages from this chat

    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    console.log("Error in deleteChat controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
