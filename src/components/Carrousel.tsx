// components/Carrousel.tsx
import React, { useState } from "react";
import { CarrouselProps } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Carrousel: React.FC<CarrouselProps> = ({ plants, handleDeletePlant }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === plants.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? plants.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="carousel w-full relative"
      style={{ width: "400px", height: "300px" }}
    >
      {plants.map((plant, index) => (
        <div
          key={plant.id_plante_suggested}
          className={`carousel-item relative w-full ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <Image
            src={`/${plant.photo}`} // Utilisation du chemin de l'image stocké dans la base de données
            alt={plant.name_plant}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-sm font-bold">{plant.name_plant}</h3>
            <p className="text-xs">Quantity: {plant.quantity_possess}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleDeletePlant(plant.id_plante_suggested)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button className="btn btn-circle btn-xs" onClick={handlePrev}>
          ❮
        </button>
        <button className="btn btn-circle btn-xs" onClick={handleNext}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
