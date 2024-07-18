// "use client";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import React, { useEffect } from "react";

// const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/connexion");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return null; // or a loading spinner
//   }

//   return <>{children}</>;
// };

// export default AuthMiddleware;

"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/connexion");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return <>{children}</>;
};

export default AuthMiddleware;
