export const shouldRender = (value: unknown): boolean => {
  if (value === null || typeof value === "undefined")
    return false; // Covers null & undefined
  else if (typeof value === "number" && isNaN(value))
    return false; // Covers NaN
  else if (typeof value === "string" && value.trim().length === 0)
    return false; // Empty or whitespace string
  else if (Array.isArray(value) && value.length === 0)
    return false; // Empty array
  else if (
    typeof value === "object" &&
    !(value instanceof Date) && // Exclude Date objects
    Object.keys(value).length === 0
  )
    return false; // Empty object
  return true; // Otherwise, return true
};

export const getErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return "Bad Request. Please check your input.";
    case 401:
      return "Unauthorized. Please log in.";
    case 403:
      return "Forbidden. You do not have access.";
    case 404:
      return "Resource not found.";
    case 500:
      return "Internal server error. Please try again later.";
    default:
      return "An unknown error occurred.";
  }
};

// Example usage:
// const indexGenerator = new UniqueIndexGenerator(10);
// console.log(indexGenerator.generateNextIndex());
export class UniqueIndexGenerator {
  private currentIndex: number;
  private maxIndex: number;

  constructor(maxIndex: number) {
    this.currentIndex = -1; // Start before the first index
    this.maxIndex = maxIndex;
  }

  generateNextIndex(): number {
    if (this.currentIndex >= this.maxIndex) {
      throw new Error("All possible indexes have been used.");
    }

    this.currentIndex++;
    return this.currentIndex;
  }
}
