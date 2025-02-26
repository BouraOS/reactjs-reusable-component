import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAuthenticated,
  userRole,
  allowedRoles,
}) => {
  const location = useLocation;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location}} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location}} replace />; // Redirect if the user role is not allowed
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
