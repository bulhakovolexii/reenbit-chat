import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import classes from "./Dialog.module.css";

interface DialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Dialog({ children, isOpen, onClose }: DialogProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={classes.backdrop} onClick={handleBackdropClick}>
      <div className={classes.dialog}>{children}</div>
    </div>,
    document.body
  );
}
