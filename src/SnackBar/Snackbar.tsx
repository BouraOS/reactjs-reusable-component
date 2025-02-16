import React, { useState, useEffect } from "react";
import { CloseIcon } from "../svg/CloseIcon";
import { CheckCircleIcon } from "../svg/CheckCircleIcon";
import { ErrorIcon } from "../svg/ErrorIcon";
import { WarningIcon } from "../svg/WarningIcon";
import { InfoIcon } from "../svg/InfoIcon";
interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
  duration?: number;
}

const getIcon = (type?: string) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon width={20} height={20} color="#fff" />;
    case "error":
      return <ErrorIcon width={20} height={20} color="#fff" />;
    case "warning":
      return <WarningIcon width={20} height={20} color="#fff" />;
    case "info":
      return <InfoIcon width={20} height={20} color="#fff" />;
    default:
      return <InfoIcon width={20} height={20} color="#fff" />;
  }
};

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = "info",
  onClose,
  duration,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const ariaRole = type === "error" ? "alert" : "status";
  const ariaLive = type === "error" ? "assertive" : "polite";

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`snackbar snackbar-${type} ${isExiting ? "exiting" : ""}`}
      role={ariaRole}
      aria-live={ariaLive}
    >
      <span className="snackbar-icon">{getIcon(type)}</span>
      <span className="snackbar-content">{message}</span>
      <button onClick={handleClose} aria-label="Dismiss message">
        <CloseIcon width={20} height={20} color="#fff" />
      </button>
    </div>
  );
};

export default Snackbar;
