import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../redux";
import classes from "./ChatPage.module.css";
import ChatForm from "../components/ChatForm";

export default function ChatPage() {
  const { chatId = "" } = useParams();
  const { data: messages = [], isLoading } = useGetMessagesQuery(chatId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.chatContainer}>
      <div className={classes.messageList}>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`${classes.message} ${
              message.isBot ? classes.botMessage : classes.ownMessage
            }`}
          >
            <p className={classes.messageContent}>{message.text}</p>
            <span className={classes.createdAt}>
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <ChatForm />
    </div>
  );
}
