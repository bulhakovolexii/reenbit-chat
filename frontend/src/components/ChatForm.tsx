import { FormEvent, useState } from "react";
import classes from "./ChatForm.module.css";
import { useSendMessageMutation } from "../redux";
import { useParams } from "react-router-dom";

export default function ChatForm() {
  const { chatId = "" } = useParams();
  const [sendMessage] = useSendMessageMutation();
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendMessage({ chatId, text: messageText });
    setMessageText("");
  };

  return (
    <form className={classes.messageForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
        className={classes.messageInput}
      />
      <button type="submit" className={classes.sendButton}>
        Send
      </button>
    </form>
  );
}
