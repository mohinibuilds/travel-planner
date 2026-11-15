import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const STORAGE_KEY   = "travelease_user";
const WELCOME_KEY   = "travelease_welcomed";

export const AuthProvider = ({ children }) => {
  // Restore user from localStorage on load
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // Track whether the user has already seen the welcome screen
  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    return !!localStorage.getItem(WELCOME_KEY);
  });

  // register(name, email, password, saveData)
  const register = (name, email, password, saveData) => {
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      avatar: name.trim().charAt(0).toUpperCase(),
      loginTime: new Date().toISOString(),
      saved: saveData,
    };
    setUser(newUser);
    if (saveData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // login(name, email, saveData)
  const login = (name, email, saveData) => {
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      avatar: name.trim().charAt(0).toUpperCase(),
      loginTime: new Date().toISOString(),
      saved: saveData,
    };
    setUser(newUser);
    if (saveData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const markWelcomeSeen = () => {
    localStorage.setItem(WELCOME_KEY, "1");
    setHasSeenWelcome(true);
  };

  return (
    <AuthContext.Provider value={{
      user, login, register, logout,
      isLoggedIn: !!user,
      hasSeenWelcome, markWelcomeSeen,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
