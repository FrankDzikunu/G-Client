import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || null);
  const [loading, setLoading] = useState(true);

  // Persist token changes in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Persist user changes in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
    }
  }, [user]);

  // On initial load, if there's a token and user is already stored, use it.
  // Otherwise, if token exists but no stored user, fetch it from backend.
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setUserRole(JSON.parse(storedUser).role);
          setLoading(false);
        } else {
          try {
            const { data } = await axios.get("http://localhost:5000/api/users/profile", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(data);
            setUserRole(data.role);
          } catch (error) {
            console.error("Error fetching user:", error.response?.data?.message || error.message);
            // Do not force logout here if localStorage already had valid data,
            // just leave user as null.
          } finally {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  // Logout function clears state and localStorage
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setUserRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, userRole, setUserRole, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
