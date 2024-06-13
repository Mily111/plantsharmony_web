"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

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

        const response = await fetch("http://localhost:5000/api/users/profil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        console.log(response.status);
        if (response.status !== 200) {
          const data = await response.json();
          throw new Error(data.message || `HTTP status ${response.status}`);
        }

        const data = await response.json();
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
    <div>
      <Header />

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
  );
}
