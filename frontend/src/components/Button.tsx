import { ButtonHTMLAttributes, ReactNode } from "react";

import classes from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`${classes.btn} ${className}`} {...props}>
      {children}
    </button>
  );
}
