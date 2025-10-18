export const isNotEmptyValue = (value: unknown): boolean => {
  if (value === null || typeof value === "undefined") {
    return false; // Covers null & undefined
  } else if (typeof value === "number" && isNaN(value)) {
    return false; // Covers NaN
  } else if (typeof value === "string" && value.trim().length === 0) {
    return false; // Empty or whitespace string
  } else if (Array.isArray(value) && value.length === 0) {
    return false; // Empty array
  } else if (
    typeof value === "object" &&
    !(value instanceof Date) && // Exclude Date objects
    Object.keys(value).length === 0
  ) {
    return false; // Empty object
  }
  return true; // Otherwise, return true
};

export function isEmptyObject(obj: any): boolean {
  // Check if the input is an object and not null
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  // Check if there are any properties in the object
  return Object.keys(obj).length === 0;
}

export const isEmptyArray = (array: any[]): boolean => array.length === 0;

export const isNull = (value: any): boolean => value === null;

export const isUndefined = (value: any): boolean => value === undefined;

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidEmailAddress = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailRegex.test(email);
};
