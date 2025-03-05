import React, { useState, useRef, useEffect } from "react";
import "./Multiselect.css";

type Option = {
  label: string;
  value: string;
};

type MultiselectProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

const Multiselect: React.FC<MultiselectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  const clearAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="multiselect">
      <div
        className={`multiselect-tags ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        {selected.map((value) => {
          const option = options.find((opt) => opt.value === value);
          return option ? (
            <div key={value} className="tag">
              {option.label}
              <button
                className="tag-remove"
                onClick={(e) => handleRemove(value, e)}
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ) : null;
        })}

        <input
          type="text"
          className="multiselect-input"
          placeholder={selected.length === 0 ? placeholder : ""}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />

        {selected.length > 0 && (
          <button
            className="clear-all"
            onClick={clearAll}
            aria-label="Clear all"
          >
            ×
          </button>
        )}

        <div className="dropdown-arrow">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={`arrow-icon ${isOpen ? "rotate" : ""}`}
          >
            <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${
                selected.includes(option.value) ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Multiselect;
