"use client";
import AuthMiddleware from "@/middleware/authMiddleware";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/utils/api";

interface User {
  username: string;
  email_user: string;
}

export default function Profil() {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const data = await getProfile(token);

        if (!data.user) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setErrorMessage(error.message);
      }
    };

    fetchProfil();
  }, []);

  if (errorMessage) {
    return <div className="text-red-500 text-center">{errorMessage}</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AuthMiddleware>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
            <h2
              className="text-center text-2xl font-bold mb-6"
              style={{ color: "#14b8a6" }}
            >
              Profil Utilisateur
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nom d'utilisateur
              </label>
              <p className="text-gray-900 bg-gray-100 p-2 rounded">
                {user.username}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <p className="text-gray-900 bg-gray-100 p-2 rounded">
                {user.email_user}
              </p>
            </div>

            <div className="mt-6">
              <button
                className=" w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                style={{ backgroundColor: "#14b8a6", borderColor: "#14b8a6" }}
                onClick={() => router.push("/")}
              >
                Retour au Tableau de Bord
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthMiddleware>
  );
}
