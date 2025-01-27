import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    return storedToken
      ? { token: storedToken, user: JSON.parse(storedUser) }
      : null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem("authToken", authData.token);
      localStorage.setItem("authUser", JSON.stringify(authData.user));
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  }, [authData]);

  const login = (token, user) => setAuthData({ token, user });
  const logout = () => setAuthData(null);

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
