// src/pages/weather.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/PublicHeader";

interface WeatherData {
  location: string;
  temperature: string;
  condition: string;
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/weather");
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-center text-2xl font-bold mb-6 text-teal-600">
            Météo Actuelle
          </h2>
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : weatherData ? (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lieu
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded">
                  {weatherData.location}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Température
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded">
                  {weatherData.temperature}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Condition
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded">
                  {weatherData.condition}
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
