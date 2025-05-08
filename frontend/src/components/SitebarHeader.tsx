import { useCheckAuthQuery, useLogoutMutation } from "../redux";
import Avatar from "./Avatar";
import Button from "./Button";
import classes from "./SidebarHeader.module.css";

export default function SidebarHeader() {
  const { data: user } = useCheckAuthQuery();
  const [logout] = useLogoutMutation();

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
      {/* Пошук по чатам */}
      <input type="text" className={classes.searchInput} />
    </header>
  );
}
