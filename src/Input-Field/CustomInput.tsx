import React, { useState } from 'react';
import EyeIcon from '../svg/eyeIcon';
import EyeOffIcon from '../svg/eyeOffIcon';
import './CustomInput.css';

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'search';
  errorMessage?: string;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  onClick?: () => void; // Made optional properly
}

export const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  keyboardType = 'text',
  errorMessage = '',
  inputStyle = {},
  containerStyle = {},
  onClick,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Renders either a custom right icon or password toggle
  const renderRightIcon = () => {
    if (rightIcon) {
      return (
        <span className="icon-right" onClick={onClick} role="button" tabIndex={0}>
          {rightIcon}
        </span>
      );
    }
    if (secureTextEntry) {
      return (
        <button
          className="icon-right-button"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
        >
          {showPassword ? <EyeIcon width={20} height={20} fill="#ccc" /> : <EyeOffIcon width={20} height={20} fill="#ccc" />}
        </button>
      );
    }
    return null;
  };

  return (
    <div className="custom-input-container" style={containerStyle}>
      <div className="input-wrapper">
        {leftIcon && <div className="icon-left">{leftIcon}</div>}
        <input
          className="input-field"
          type={secureTextEntry && !showPassword ? 'password' : keyboardType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? 'error-message' : undefined}
          {...rest}
        />
        {renderRightIcon()}
      </div>
      {errorMessage && (
        <p id="error-message" className="error-text">
          {errorMessage}*
        </p>
      )}
    </div>
  );
};
