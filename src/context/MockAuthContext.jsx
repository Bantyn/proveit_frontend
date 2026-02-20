import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Roles: "guest", "candidate", "company", "admin"
  const [user, setUser] = useState(null); // { name: "John Doe", role: "guest" }
  const [role, setRole] = useState("guest"); // Default to guest

  const login = (newRole = "candidate") => {
    setUser({ name: "Test User", role: newRole });
    setRole(newRole);
  };

  const logout = () => {
    setUser(null);
    setRole("guest");
  };

  const value = {
    user,
    role,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
