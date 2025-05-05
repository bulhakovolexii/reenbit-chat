import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    if (!chatId) return res.status(400).json({ message: "chatId is required" });

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    if (messages.length < 1)
      return res.status(400).json({ messages: "Chat is empty" });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const text = req.body.text;

    if (!chatId || !text) {
      return res.status(400).json({ message: "chatId and text are required" });
    }

    const message = await Message.create({
      chatId,
      userId: req.user._id,
      isBot: false,
      text,
    });

    res.status(201).json(message);

    setTimeout(async () => {
      try {
        const resp = await fetch("http://api.quotable.io/random");
        const data = await resp.json();

        await Message.create({
          chatId,
          userId: req.user._id,
          isBot: true,
          text: data.content,
        });
      } catch (error) {
        console.error("Error fetching quote:", error.message);
      }
    }, 3000);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const text = req.body.text;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const filter = { _id: messageId, chatId, userId: req.user._id };
    const update = { text };
    const options = { returnOriginal: false };

    const message = await Message.findOneAndUpdate(filter, update, options);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in updateMessage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;

    const message = await Message.findOneAndDelete({
      _id: messageId,
      chatId,
      userId: req.user._id,
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    console.log("Error in deleteMessage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
