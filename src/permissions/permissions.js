// Define role-specific permissions
// view_all = view own + view all
const rolePermissions = {
  admin: ["view_all", "add", "edit", "delete"],
  moderator: ["view_all"],
  user: ["view", "add", "edit", "delete"],
};

export const hasActionPermission = (role, action, resource) => {
  const rolePermissionsList = rolePermissions[role] || [];

  if (!rolePermissionsList?.includes(action)) {
    return false;
  }
  if (action === "delete" && resource?.status === "completed") return false;
  return true;
};
