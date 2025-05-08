import { Outlet } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";

import classes from "./ChatLayout.module.css";

export default function ChatLayout() {
  return (
    <main className={classes.layout}>
      <ChatSidebar />
      <Outlet />
    </main>
  );
}
