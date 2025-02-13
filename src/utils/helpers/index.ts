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

export const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

export const isValidEmailAddress = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailRegex.test(email);
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
