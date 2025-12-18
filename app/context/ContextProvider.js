"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children, isLoginstate }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  );

  const [isLogin, setIsLogin] = useState(() => !!token);

  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light",
  );
  const MAX_SIZE = 300 * 1024;
  useEffect(() => {
    // Only update the DOM, not React state
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const getservice = async (page = 1, limit = 6) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/service?page=${page}&limit=${limit}`,
      );
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("token");
        setToken(null);
        setIsLogin(false);
        window.location.href = "/login";
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
        setIsLogin,
        logout,
        isLoginstate,
        MAX_SIZE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
