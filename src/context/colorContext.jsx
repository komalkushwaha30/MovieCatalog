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

  // Reminder state
  const [reminders, setReminders] = useState(() => {
    if (!userId) return {};
    const data = localStorage.getItem(`reminders_${userId}`);
    return data ? JSON.parse(data) : {};
  });

  // Reload likes and reminders when userId changes
  useEffect(() => {
    if (userId) {
      const likesData = localStorage.getItem(`likes_${userId}`);
      setLike(likesData ? JSON.parse(likesData) : []);

      const remindersData = localStorage.getItem(`reminders_${userId}`);
      setReminders(remindersData ? JSON.parse(remindersData) : {});
    } else {
      setLike([]);
      setReminders({});
    }
  }, [userId]);

  // Save likes and reminders for this user
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`likes_${userId}`, JSON.stringify(like));
      localStorage.setItem(`reminders_${userId}`, JSON.stringify(reminders));
    }
  }, [like, reminders, userId]);

  // Logout logic
  function logout() {
    localStorage.removeItem("currentUser");
    setUserId(null);
    setLike([]);
    setReminders({});
  }

  // Login logic
  function login(newUserId) {
    localStorage.setItem("currentUser", newUserId);
    setUserId(newUserId);
  }

  return (
    <ColorContext.Provider value={{
      darkMode, setDarkMode, like, setLike, logout, login, userId,
      reminders, setReminders
    }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  return useContext(ColorContext);
}