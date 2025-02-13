import React, { ChangeEvent } from "react";
import "./Checkbox.css";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled,
  name,
  id,
  className,
  required,
}) => {
  return (
    <label
      className={`checkbox-container ${disabled ? "disabled" : ""} ${
        className || ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        id={id}
        required={required}
      />
      <span className="custom-checkbox">
        {checked && (
          <svg
            className="checkbox-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;
