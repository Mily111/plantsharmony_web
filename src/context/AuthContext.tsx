"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { login as apiLogin } from "../utils/api"; // Assurez-vous d'adapter le chemin selon votre structure

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    const storedUserId = localStorage.getItem("userId");
    if (storedAuthState === "true" && storedUserId) {
      setIsAuthenticated(true);
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await apiLogin(username, password);
      if (data.token && data.userId) {
        setIsAuthenticated(true);
        setUserId(data.userId);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", data.userId.toString());
        localStorage.setItem("token", data.token); // Stocke également le token si nécessaire
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userId");
    localStorage.removeItem("token"); // Supprime également le token si nécessaire
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
