"use client";

import React, { useEffect, useState } from "react";
import { getAllPlants } from "@/utils/api";
import { Plant } from "@/types/types";

const PlantAdvice = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantData = await getAllPlants();
        setPlants(plantData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des plantes:",
          error
        );
      }
    };

    fetchPlants();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      const selectedId = parseInt(selectedValue);
      setSelectedPlantId(selectedId);
      console.log("Selected Plant ID:", selectedId);
    } else {
      setSelectedPlantId(null);
      console.log("No plant selected");
    }
  };

  const handleValidateClick = () => {
    if (selectedPlantId !== null) {
      const plant = plants.find((p) => p.id_plant === selectedPlantId);
      setSelectedPlant(plant || null);
      console.log("Selected Plant:", plant);
    } else {
      console.log("No plant selected");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-teal-400 mb-4">
        Conseils Plantes
      </h1>
      <div className="mb-4">
        <label
          htmlFor="plant-select"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Sélectionnez une plante
        </label>
        <div className="flex space-x-4">
          <select
            id="plant-select"
            onChange={handleSelectChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Choisir une plante</option>
            {plants.map((plant) => (
              <option
                key={plant.id_plant}
                value={plant.id_plant?.toString() || ""}
              >
                {plant.name_plant}
              </option>
            ))}
          </select>
          <button
            onClick={handleValidateClick}
            className="bg-teal-400 text-white px-4 py-2 rounded shadow hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            Valider
          </button>
        </div>
      </div>
      {selectedPlant && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold text-teal-400 mb-2">
            {selectedPlant.name_plant}
          </h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Propriété</th>
                <th className="px-4 py-2 text-left">Valeur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Type de plante</td>
                <td className="border px-4 py-2">
                  {selectedPlant.plant_type_name}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Type de sol</td>
                <td className="border px-4 py-2">
                  {selectedPlant.label_soil_type}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Niveau d'humidité</td>
                <td className="border px-4 py-2">
                  {selectedPlant.humidity_level}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Niveau de lumière</td>
                <td className="border px-4 py-2">
                  {selectedPlant.light_level}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlantAdvice;
