import { getPermissionsForRole } from "./permissions";

export const hasActionPermission = (role, action, resource) => {
  const rolePermissionsList = getPermissionsForRole(role);

  if (!rolePermissionsList?.includes(action)) {
    return false;
  }
  if (action === "delete" && resource?.status === "completed") return false;
  return true;
};
