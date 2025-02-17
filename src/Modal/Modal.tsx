import React, { useEffect, useCallback, useRef } from "react";
import "./Modal.css";

type ModalAnimation = "fade" | "slide-up" | "slide-down";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  footerAlign?: "left" | "center" | "right";
  showDividers?: boolean;
  animation?: ModalAnimation; // New prop for animations
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
  footerAlign = "right",
  showDividers = true,
  animation = "fade", // Default animation
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscapeKey]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${
        isOpen ? "modal-overlay--open" : ""
      } modal-overlay--${animation}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`modal modal--${size} ${
          isOpen ? "modal--open" : ""
        } modal--${animation}`}
        ref={modalRef}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div
            className={`modal__header ${
              showDividers ? "modal__header--with-divider" : ""
            }`}
          >
            {title && (
              <h2 id="modal-title" className="modal__title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  className="modal__close-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="modal__content">{children}</div>
        {footer && (
          <div
            className={`modal__footer modal__footer--${footerAlign} ${
              showDividers ? "modal__footer--with-divider" : ""
            }`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
