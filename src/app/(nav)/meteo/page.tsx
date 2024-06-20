"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/PublicHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherData } from "@/types/types";

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "ensoleillé":
    case "eclaircies":
    case "clair":
      return "fas fa-sun";
    case "pluie":
    case "pluie faible":
    case "pluvieux":
      return "fas fa-cloud-showers-heavy";
    case "nuageux":
      return "fas fa-cloud";
    case "couvert":
      return "fas fa-cloud";
    case "très nuageux":
      return "fas fa-cloud";
    case "orage":
      return "fas fa-bolt";
    case "neige":
      return "fas fa-snowflake";
    default:
      return "fas fa-cloud-sun";
  }
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/weather/getWeatherData"
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-center text-2xl font-bold mb-6 text-teal-400">
            <FontAwesomeIcon icon="cloud-sun" /> Météo Actuelle
          </h2>
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : weatherData ? (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon="map-marker-alt" /> Lieu
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded text-teal-400">
                  {weatherData.location}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon="thermometer-half" /> Température
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded text-teal-400">
                  {weatherData.temperature}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon
                    icon={getWeatherIcon(weatherData.condition)}
                  />{" "}
                  Condition
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded text-teal-400">
                  {weatherData.condition}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon="wind" /> Vitesse du Vent
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded text-teal-400">
                  {weatherData.windSpeed}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">Chargement...</div>
          )}
        </div>
      </div>
    </div>
  );
}
