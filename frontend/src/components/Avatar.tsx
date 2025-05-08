import { ImgHTMLAttributes } from "react";

import classes from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function Avatar({ src, className, ...props }: AvatarProps) {
  return (
    <img
      src={src}
      alt=""
      className={`${className} ${classes.avatar}`}
      {...props}
    />
  );
}
