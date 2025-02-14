const CheckIcon = ({ width, height, color, ...props }) => (
  <svg
    className="checkbox-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width || "24px"}
    height={height || "24px"}
    fill="none"
    stroke={color || "white"}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CheckIcon;
