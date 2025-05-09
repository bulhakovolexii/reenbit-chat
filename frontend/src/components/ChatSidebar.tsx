import { FormEvent, useState } from "react";
import { useAddChatMutation, useGetChatsQuery } from "../redux";
import classes from "./ChatSidebar.module.css";
import ChatThumb from "./ChatThumb";
import SidebarHeader from "./SidebarHeader";
import Button from "./Button";
import Dialog from "./Dialog";
import Input from "./Input";

export default function ChatSidebar() {
  const { data: chats = [] } = useGetChatsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [addChat] = useAddChatMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const filteredChats = chats.filter((chat) => {
    const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      chat.firstName.toLowerCase().includes(query) ||
      chat.lastName.toLowerCase().includes(query)
    );
  });

  const toggleDialog = () => {
    setDialogIsOpen(!dialogIsOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addChat(formData).unwrap();
      setFormData({ firstName: "", lastName: "" });
      setDialogIsOpen(false);
    } catch (error) {
      console.error("Failed to add chat:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <aside className={classes.sidebar}>
      <SidebarHeader onSearch={setSearchQuery} />
      <div className={classes.chatsWrapper}>
        <div className={classes.subHeader}>
          <h3 className={classes.heading}>Chats</h3>
          <Button className={classes.addChatBtn} onClick={toggleDialog}>
            Add chat
          </Button>
        </div>
        {filteredChats.map((chat) => (
          <ChatThumb
            img={chat.avatarUrl}
            firstName={chat.firstName}
            lastName={chat.lastName}
            key={chat._id}
            id={chat._id}
          />
        ))}
      </div>
      <Dialog isOpen={dialogIsOpen} onClose={toggleDialog}>
        <h4>Add new chat</h4>
        <form onSubmit={handleSubmit} className={classes.newChatForm}>
          <label htmlFor="firstName">First Name</label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <div className={classes.formButtons}>
            <Button type="button" onClick={toggleDialog}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Dialog>
    </aside>
  );
}
