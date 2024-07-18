// "use client";
// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import { login as apiLogin, getProfile } from "../utils/api"; // Assurez-vous d'adapter le chemin selon votre structure
// import { LoginResponse, AuthContextType, User } from "@/types/types";

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [userProfile, setUserProfile] = useState<User | null | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     const storedAuthState = localStorage.getItem("isAuthenticated");
//     const storedUserId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");

//     if (storedAuthState === "true" && storedUserId && token) {
//       setIsAuthenticated(true);
//       setUserId(parseInt(storedUserId, 10));
//       fetchUserProfile(token);
//     }
//   }, []);

//   const fetchUserProfile = async (token: string) => {
//     try {
//       const data = await getProfile(token);
//       setUserProfile(data); // Assurez-vous que data est bien de type User
//     } catch (error) {
//       console.error("Failed to fetch profile", error);
//     }
//   };

//   const login = async (username: string, password: string) => {
//     try {
//       const data: LoginResponse = await apiLogin(username, password);
//       if (data.token) {
//         setIsAuthenticated(true);
//         const userId = data.userId || null;
//         setUserId(userId);
//         localStorage.setItem("isAuthenticated", "true");
//         if (userId !== null) {
//           localStorage.setItem("userId", userId.toString());
//         }
//         localStorage.setItem("token", data.token);
//         fetchUserProfile(data.token); // Fetch user profile after login
//       } else {
//         throw new Error(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Erreur de connexion:", error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUserId(null);
//     setUserProfile(null);
//     localStorage.setItem("isAuthenticated", "false");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, userId, login, logout, userProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import axios from "axios";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { login as apiLogin, getProfile } from "../utils/api";
import { LoginResponse, AuthContextType, User } from "@/types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<User | null | undefined>(
    undefined
  );
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const fetchAndSetCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/csrf-token",
          { withCredentials: true }
        );
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    };
    fetchAndSetCsrfToken();
  }, []);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (storedAuthState === "true" && storedUserId && token) {
      setIsAuthenticated(true);
      setUserId(parseInt(storedUserId, 10));
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const data = await getProfile(token);
      setUserProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const data: LoginResponse = await apiLogin(username, password, csrfToken);
      if (data.token) {
        setIsAuthenticated(true);
        const userId = data.userId || null;
        setUserId(userId);
        localStorage.setItem("isAuthenticated", "true");
        if (userId !== null) {
          localStorage.setItem("userId", userId.toString());
        }
        localStorage.setItem("token", data.token);
        fetchUserProfile(data.token);
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
    setUserProfile(null);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, login, logout, userProfile, csrfToken }}
    >
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
