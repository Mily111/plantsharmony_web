"use client";
import React from "react";
import Link from "next/link";

const PublicHeader = () => {
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
        </div>
        <div className="flex space-x-4">
          <Link href="/inscription" passHref>
            <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700">
              Créer un compte
            </button>
          </Link>
          <Link href="/connexion" passHref>
            <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700">
              Se connecter
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default PublicHeader;
