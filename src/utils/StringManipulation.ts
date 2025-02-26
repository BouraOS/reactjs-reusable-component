export const capitalizeFirstLetter = (inputString: string): string => {
  if (!inputString || inputString.trim() === "") {
    return "";
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

export function toTitleCase(inputText: string): string {
  if (!inputText || inputText.trim() === "") {
    return "";
  }

  return inputText.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export const truncateText = (inputText: string, maxLength: number): string => {
  if (inputText.length <= maxLength) {
    return inputText;
  }

  return `${inputText.substring(0, maxLength)}...`;
};
