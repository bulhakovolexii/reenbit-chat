import { useParams } from "react-router-dom";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} from "../redux";

export default function ChatPage() {
  const { chatId } = useParams();
  const { data: messages = [] } = useGetMessagesQuery(chatId);
  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const handleSend = () => {
    sendMessage({ chatId, text: "123123123123" });
  };
  const handleUpdate = (messageId) => {
    updateMessage({ chatId, messageId, text: "123123123123" });
  };
  const handleDelete = (messageId) => {
    deleteMessage({ chatId, messageId });
  };

  return (
    <>
      {messages.map((message) => (
        <div key={message._id}>
          {message.text}
          <button onClick={() => handleUpdate(message._id)}>update</button>
          <button onClick={() => handleDelete(message._id)}>delete</button>
        </div>
      ))}
      <button onClick={handleSend}>send</button>
    </>
  );
}
