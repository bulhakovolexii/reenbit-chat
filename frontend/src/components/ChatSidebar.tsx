import { useGetChatsQuery } from "../redux";
import classes from "./ChatSidebar.module.css";
import ChatThumb from "./ChatThumb";
import SidebarHeader from "./SitebarHeader";

export default function ChatSidebar() {
  const { data: chats = [] } = useGetChatsQuery();

  return (
    <aside className={classes.sidebar}>
      <SidebarHeader />
      <h3 className={classes.heading}>Chats</h3>
      {chats.map((chat) => (
        <ChatThumb
          img={chat.avatarUrl}
          firstName={chat.firstName}
          lastName={chat.lastName}
          key={chat._id}
          id={chat._id}
        />
      ))}
    </aside>
  );
}
