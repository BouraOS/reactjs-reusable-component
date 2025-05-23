import React from "react";

const CircleMinus = ({ width, height, color, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width || "24px"}
    height={height || "24px"}
    fill={color || "none"}
    {...props}
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
  </svg>
);

export default CircleMinus;
