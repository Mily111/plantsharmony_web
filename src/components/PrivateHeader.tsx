"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLeaf,
  faCloudSun,
  faSeedling,
  faExchangeAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const PrivateHeader = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-green-100 p-4 rounded-lg shadow-2xl">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex space-x-4">
          <Link href="/" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faHome} />
              <span>Accueil</span>
            </span>
          </Link>
          <Link href="/conseils" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faLeaf} />
              <span>Conseils plantes</span>
            </span>
          </Link>
          <Link href="/meteo" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faCloudSun} />
              <span>Meteo</span>
            </span>
          </Link>
          <Link href="/plantsAvailable" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faSeedling} />
              <span>Plantes disponibles pour le troc</span>
            </span>
          </Link>
          <Link href="/addPlants" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faSeedling} />
              <span>Ajoute ta plante pour un troc</span>
            </span>
          </Link>
          <Link href="/trocPlants" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faExchangeAlt} />
              <span>Troc ta plante</span>
            </span>
          </Link>
          <Link href="/profil" passHref>
            <span className="cursor-pointer text-teal-700 hover:bg-teal-300 shadow-lg rounded-lg p-2 flex items-center space-x-1">
              <FontAwesomeIcon icon={faUser} />
              <span>Informations personnelles</span>
            </span>
          </Link>
        </div>
        {isAuthenticated && (
          <button
            onClick={logout}
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 shadow-lg"
          >
            Se déconnecter
          </button>
        )}
      </nav>
    </header>
  );
};

export default PrivateHeader;
