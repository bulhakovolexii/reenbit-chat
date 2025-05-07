import { Link, useNavigate } from "react-router-dom";
import { useGetChatsQuery, useDeleteChatMutation } from "../redux";

export default function ChatSidebar() {
  const { data: chats = [] } = useGetChatsQuery();
  const navigate = useNavigate();

  const [deleteChat] = useDeleteChatMutation();

  const handleDelete = async (chatId) => {
    try {
      await deleteChat(chatId);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>
          <Link to={`/${chat._id}`} key={chat._id}>
            {chat.firstName} {chat.lastName}
          </Link>
          <button onClick={() => handleDelete(chat._id)}>delete</button>
        </div>
      ))}
    </div>
  );
}
