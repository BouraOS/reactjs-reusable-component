import * as React from "react";
const PlusSvg = ({ width, height, color, ...props }) => (
  <svg
    width={width || "50px"}
    height={height || "50px"}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
      fill={color || "#0D0D0D"}
    />
  </svg>
);
export default PlusSvg;
