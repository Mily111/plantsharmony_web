"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const PrivateHeader = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-green-100 p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex space-x-4">
          <Link href="/" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Accueil
            </span>
          </Link>
          <Link href="/conseils" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Conseils plantes
            </span>
          </Link>
          <Link href="/meteo" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Meteo
            </span>
          </Link>
          <Link href="/plantsAvailable" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Plantes disponibles pour le troc
            </span>
          </Link>
          <Link href="/addPlants" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Ajoute ta plante pour un troc
            </span>
          </Link>
          <Link href="/trocPlants" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Troc ta plante
            </span>
          </Link>
          <Link href="/profil" passHref>
            <span className="cursor-pointer text-teal-600 hover:bg-teal-200 shadow-lg">
              Informations personnelles
            </span>
          </Link>
        </div>
        {isAuthenticated && (
          <button
            onClick={logout}
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700"
          >
            Se déconnecter
          </button>
        )}
      </nav>
    </header>
  );
};

export default PrivateHeader;
