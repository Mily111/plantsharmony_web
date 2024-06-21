// components/Carrousel.tsx
import React from "react";
import { SuggestedPlant } from "@/types/types";

interface CarrouselProps {
  plants: SuggestedPlant[];
  handleDeletePlant: (plantId: number) => void;
}

const Carrousel: React.FC<CarrouselProps> = ({ plants, handleDeletePlant }) => {
  return (
    <div className="carousel w-full mb-6">
      {plants.map((plant, index) => (
        <div
          key={index}
          id={`slide${index}`}
          className="carousel-item relative w-full"
        >
          <img
            src={plant.photo}
            className="w-full h-48 object-cover"
            alt={plant.name_plant}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-opacity-50 bg-gray-900 text-white">
            <h3 className="text-lg">{plant.name_plant}</h3>
            <p className="text-sm">Quantité: {plant.quantity_possess}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
              onClick={() => handleDeletePlant(plant.id_plante_suggested)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-4">
        {plants.map((_, index) => (
          <a key={index} href={`#slide${index}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
