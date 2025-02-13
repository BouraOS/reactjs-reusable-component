import { createContext, useContext, useState } from "react";
import { getPermissionsForRole } from "./auth";

// AuthContext.js
const AuthContext = createContext();
const dummyUser = {
  id: 1,
  name: "John Doe",
  role: "USER", // Change this to "USER" to test different roles
  department: "marketing",
  permissions: [],
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    ...dummyUser,
    permissions: getPermissionsForRole(dummyUser.role),
  });

  const login = (userDetails) => {
    const permissions = getPermissionsForRole(userDetails.role);
    setUser({ ...userDetails, permissions });
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
