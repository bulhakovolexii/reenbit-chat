import { Link, useParams } from "react-router-dom";
import { useGetLastMessageQuery } from "../redux";
import Avatar from "./Avatar";
import classes from "./ChatThumb.module.css";

interface ChatThumbProps {
  id: string;
  firstName: string;
  lastName: string;
  img: string;
}

export default function ChatThumb({
  id,
  firstName,
  lastName,
  img,
}: ChatThumbProps) {
  const { data: lastMessage = { createdAt: "", text: "" }, isLoading } =
    useGetLastMessageQuery(id);
  const { chatId } = useParams();

  const getFormattedDate = (isoDate: string): string => {
    if (!isoDate) return "";

    const date = new Date(isoDate);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link
      to={`/${id}`}
      className={`${classes.thumb} ${chatId === id ? classes.active : ""}`}
    >
      <Avatar src={img} className={classes.avatar} />
      <div className={classes.message}>
        <h4 className={classes.userName}>{firstName + " " + lastName}</h4>
        <p className={classes.text}>{lastMessage?.text}</p>
      </div>
      <span className={classes.time}>
        {isLoading ? "Loading..." : getFormattedDate(lastMessage?.createdAt)}
      </span>
    </Link>
  );
}
