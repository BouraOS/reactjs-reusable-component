
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidEmailAddress = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailRegex.test(email);
};