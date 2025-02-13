// PermissionGate.js
import { useAuth } from "./AuthContext";

const PermissionGate = ({ permission, children }) => {
  const { user } = useAuth();
  if (!user?.permissions.includes(permission)) {
    return null;
  }
  return children;
};

export default PermissionGate;

// Example usage:
// 1-->
// <PermissionGate permission="viewDashboard">
//   <Dashboard />
// </PermissionGate>

// 2-->

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <PermissionGate permission="manageUsers">
//         <button>Manage Users</button>
//       </PermissionGate>
//       <PermissionGate permission="editSettings">
//         <button>Edit Settings</button>
//       </PermissionGate>
//     </div>
//   );
// };
