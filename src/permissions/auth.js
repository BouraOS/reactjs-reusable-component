import { PERMISSIONS } from "./permissions";

// auth.js
export const getPermissionsForRole = (role) => {
  return PERMISSIONS[role] || [];
};
