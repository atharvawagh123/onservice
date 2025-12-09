"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext(null);

// Provider component
export const AuthContextProvider = ({ children, isLoginstate }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [theme, setTheme] = useState("light");
  const [isLogin, setisLogin] = useState(isLoginstate);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const token = localStorage.getItem("token");
    if (token) {
      setisLogin(!!token);
    }
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const getservice = async (page = 1, limit = 6) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/service?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // ✅ important
      });

      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("token");
        setToken(null);
        setisLogin(false);
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", data.error);
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        getservice,
        toggleTheme,
        theme,
        isLogin,
        setisLogin,
        logout,
        isLoginstate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume context
export const useAuthContext = () => useContext(AuthContext);
