"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children, isLoginstate }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  );

  const [theme, setTheme] = useState("light");
  const [isLogin, setIsLogin] = useState(isLoginstate);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const storedToken = localStorage.getItem("token");

    if (storedToken) setIsLogin(true);
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

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

    document.documentElement.classList.toggle("dark", newTheme === "dark");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
