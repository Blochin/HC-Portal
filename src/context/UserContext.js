import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    api.get("api/token/validation").then((response) => {
      console.log(response);
      if (storedUser && response?.data?.status_code === 200) {
        setUser(JSON.parse(storedUser));
      } else {
        logout();
      }
    });
  }, []);
  const login = (data, email) => {
    try {
      data.user.email = email;
      setUser(data.user);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error saving user to localStorage", error);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
