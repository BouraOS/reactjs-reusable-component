import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAuthenticated,
  userRole,
  allowedRoles,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect if the user role is not allowed
  }

  return children;
};

export default ProtectedRoute;

// isAuthenticated and userRole with values from your auth context

// Example usage:
// <ProtectedRoute
//   isAuthenticated={user.isAuthenticated}
//   userRole={user.role}
//   allowedRoles={["admin", "moderator"]}
// >
//   <Dashboard />
// </ProtectedRoute>
