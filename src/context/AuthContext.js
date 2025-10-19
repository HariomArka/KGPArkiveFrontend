import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Question stats
  const [answeredCount, setAnsweredCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Expose function so Questions.js can update counts
  const updateQuestionStats = (answered, unanswered) => {
    setAnsweredCount(answered);
    setUnansweredCount(unanswered);
    setTotalCount(answered + unanswered);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        answeredCount,
        unansweredCount,
        totalCount,
        updateQuestionStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
