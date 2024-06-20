"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLeaf,
  faCloudSun,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

const PublicHeader = () => {
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
        </div>
        <div className="flex space-x-4">
          <Link href="/inscription" passHref>
            <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 shadow-lg">
              Créer un compte
            </button>
          </Link>
          <Link href="/connexion" passHref>
            <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 shadow-lg">
              Se connecter
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default PublicHeader;
