import { Outlet } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";

export default function ChatLayout() {
  return (
    <>
      <ChatSidebar />
      <Outlet />
    </>
  );
}
