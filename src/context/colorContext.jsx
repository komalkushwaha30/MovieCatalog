import { createContext, useContext, useState, useEffect } from "react";

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // User ID state
  const [userId, setUserId] = useState(localStorage.getItem("currentUser"));

  // Like state
  const [like, setLike] = useState(() => {
    if (!userId) return [];
    const data = localStorage.getItem(`likes_${userId}`);
    return data ? JSON.parse(data) : [];
  });

  // Reload likes when userId changes
  useEffect(() => {
    if (userId) {
      const data = localStorage.getItem(`likes_${userId}`);
      setLike(data ? JSON.parse(data) : []);
    } else {
      setLike([]);
    }
  }, [userId]);

  // Save likes for this user
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`likes_${userId}`, JSON.stringify(like));
    }
  }, [like, userId]);

  // Logout logic
  function logout() {
    localStorage.removeItem("currentUser");
    setUserId(null);
    setLike([]);
  }

  // Login logic
  function login(newUserId) {
    localStorage.setItem("currentUser", newUserId);
    setUserId(newUserId);
  }

  return (
    <ColorContext.Provider value={{ darkMode, setDarkMode, like, setLike, logout, login, userId }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  return useContext(ColorContext);
}