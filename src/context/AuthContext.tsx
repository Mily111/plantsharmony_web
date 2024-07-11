// "use client";
// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import { login as apiLogin } from "../utils/api"; // Assurez-vous d'adapter le chemin selon votre structure

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userId: number | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const storedAuthState = localStorage.getItem("isAuthenticated");
//     const storedUserId = localStorage.getItem("userId");
//     if (storedAuthState === "true" && storedUserId) {
//       setIsAuthenticated(true);
//       setUserId(parseInt(storedUserId, 10));
//     }
//   }, []);

//   const login = async (username: string, password: string) => {
//     try {
//       const data = await apiLogin(username, password);
//       if (data.token && data.userId) {
//         setIsAuthenticated(true);
//         setUserId(data.userId);
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("userId", data.userId.toString());
//         localStorage.setItem("token", data.token); // Stocke également le token si nécessaire
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
//     localStorage.setItem("isAuthenticated", "false");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("token"); // Supprime également le token si nécessaire
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
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

// "use client";
// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import { login as apiLogin, getProfile } from "../utils/api";
// import { AuthContextType, LoginResponse, User } from "../types/types";

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [userProfile, setUserProfile] = useState<User | null>(null);

//   useEffect(() => {
//     const storedAuthState = localStorage.getItem("isAuthenticated");
//     const storedUserId = localStorage.getItem("userId");
//     const storedToken = localStorage.getItem("token");
//     if (storedAuthState === "true" && storedUserId && storedToken) {
//       setIsAuthenticated(true);
//       setUserId(parseInt(storedUserId, 10));
//       // Récupérer le profil utilisateur stocké si nécessaire
//       getProfile(storedToken)
//         .then((profile) => {
//           setUserProfile(profile);
//         })
//         .catch((error) => {
//           console.error(
//             "Erreur lors de la récupération du profil utilisateur:",
//             error
//           );
//         });
//     }
//   }, []);

//   const login = async (username: string, password: string) => {
//     try {
//       const data: LoginResponse = await apiLogin(username, password);
//       if (data.token && data.userId) {
//         setIsAuthenticated(true);
//         setUserId(data.userId);
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("userId", data.userId.toString());
//         localStorage.setItem("token", data.token);

//         // Récupérez le profil utilisateur après la connexion
//         const profile: User = await getProfile(data.token);
//         console.log("User profile fetched successfully", profile);
//         setUserProfile(profile);
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
//     setUserProfile(null); // Réinitialiser le profil utilisateur
//     localStorage.setItem("isAuthenticated", "false");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, userId, userProfile, login, logout }}
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

"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { login as apiLogin, getProfile } from "../utils/api"; // Assurez-vous d'adapter le chemin selon votre structure
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
      setUserProfile(data); // Assurez-vous que data est bien de type User
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const data: LoginResponse = await apiLogin(username, password);
      if (data.token) {
        setIsAuthenticated(true);
        const userId = data.userId || null;
        setUserId(userId);
        localStorage.setItem("isAuthenticated", "true");
        if (userId !== null) {
          localStorage.setItem("userId", userId.toString());
        }
        localStorage.setItem("token", data.token);
        fetchUserProfile(data.token); // Fetch user profile after login
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
      value={{ isAuthenticated, userId, login, logout, userProfile }}
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
