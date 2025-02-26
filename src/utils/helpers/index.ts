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
