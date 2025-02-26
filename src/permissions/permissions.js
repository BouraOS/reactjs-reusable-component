// Define role-specific permissions
// view_all = view own + view all

export const rolePermissions = {
  admin: ["view_all", "add", "edit", "delete"],
  moderator: ["view_all"],
  user: ["view", "add", "edit", "delete"],
};
// auth.js
export const getPermissionsForRole = (role) => {
  return rolePermissions[role] || [];
};
