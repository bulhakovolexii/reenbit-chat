import { ChangeEvent } from "react";
import { useCheckAuthQuery, useLogoutMutation } from "../redux";
import Avatar from "./Avatar";
import Button from "./Button";
import classes from "./SidebarHeader.module.css";
import Input from "./Input";

interface SidebarHeaderProps {
  onSearch: (query: string) => void;
}

export default function SidebarHeader({ onSearch }: SidebarHeaderProps) {
  const { data: user } = useCheckAuthQuery();
  const [logout] = useLogoutMutation();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className={classes.header}>
      <div className={classes.userWrapper}>
        <Avatar src="/avatars/user.jpg" />
        <h2 className={classes.userName}>
          {user && `${user.firstName} ${user.lastName}`}
        </h2>
        <Button className={classes.logoutButton} onClick={() => logout()}>
          Log Out
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Search chats..."
        className={classes.searchInput}
        onChange={handleSearch}
      />
    </header>
  );
}
