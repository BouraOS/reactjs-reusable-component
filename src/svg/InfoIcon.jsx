export function InfoIcon({ width, height, color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width || "1em"}
      height={height || "1em"}
      {...props}
    >
      <path
        fill={color || "currentColor"}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"
      ></path>
    </svg>
  );
}
