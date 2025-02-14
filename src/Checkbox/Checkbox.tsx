import React, { ChangeEvent } from "react";
import "./Checkbox.css";
import CheckIcon from "../svg/CheckIcon";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
  checkmarkColor?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange = () => {},
  label = "",
  disabled = false,
  name = "",
  id = "",
  className = "",
  required = false,
  checkmarkColor = "white",
}) => {
  return (
    <label
      htmlFor={id} // Associate the <label> with <input> using the id attribute
      className={`checkbox-container ${
        disabled ? "disabled" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-label={label || "checkbox"}
        aria-disabled={disabled}
        aria-checked={checked}
      />
      <span className="custom-checkbox">
        {checked && <CheckIcon width="15" height="15" color={checkmarkColor} />}
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;
