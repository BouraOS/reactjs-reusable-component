export function UserIcon({ width, height, color, ...props }) {
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
        fillRule="evenodd"
        d="M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
