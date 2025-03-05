import React, { JSX } from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
  style?: React.CSSProperties;
  className?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  [key: string]: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  bgColor,
  style = {},
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const [isFocused, setFocused] = React.useState(false);

  // Default button styles
  const defaultStyles: React.CSSProperties = {
    backgroundColor: bgColor || "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: icon ? "8px" : "0px", // Space between text and icon if icon exists
    outline: "none",
  };

  /*
  // Keyframes for spinner animation (can be moved to global CSS)
  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  */

  /*
  const Spinner = () => {
    // Spinner styles
    const spinnerStyle: React.CSSProperties = {
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTop: "2px solid white",
      width: "16px",
      height: "16px",
      animation: "spin 1s linear infinite",
    };
    return (
      <>
        <style>{keyframes}</style>
        <div style={spinnerStyle} />
      </>
    );
  };

  */

  // Focus styles
  const focusStyles: React.CSSProperties = {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)",
  };

  // Combine default styles and user-defined styles
  const combinedStyle = {
    ...defaultStyles,
    ...style,
    ...(isFocused ? focusStyles : {}),
  };

  return (
    <>
      <button
        style={combinedStyle}
        onClick={!disabled && !loading ? onClick : undefined}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading} // Accessibility enhancement for loading state
        className={className}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </button>
    </>
  );
};

export default CustomButton;
