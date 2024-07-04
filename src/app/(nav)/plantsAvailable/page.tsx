// //

// // pages/plantsAvailable.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getAvailableTrades } from "@/utils/api";
// import PlantCard from "@/components/PlantCard";
// import { SuggestedPlant } from "@/types/types";

// export default function PlantsAvailable() {
//   const [plants, setPlants] = useState<SuggestedPlant[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getAvailableTrades()
//       .then((data) => {
//         console.log("Plants data: ", data); // Ajoutez ce log
//         setPlants(data);
//       })
//       .catch((err) => {
//         console.error(
//           "Erreur lors de la récupération des plantes disponibles:",
//           err
//         );
//         setError(err.message);
//       });
//   }, []);

//   return (
//     <div>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">
//           Plantes disponibles pour échange
//         </h1>
//         {error ? <p className="text-red-500">{error}</p> : null}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {plants.map((plant) => (
//             <PlantCard key={plant.id_plante_suggested} plant={plant} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/plantsAvailable.tsx
"use client";

import { useEffect, useState } from "react";
import { getAvailablePlants } from "@/utils/api";
import PlantCard from "@/components/PlantCard";
import { SuggestedPlant } from "@/types/types";

export default function PlantsAvailable() {
  const [plants, setPlants] = useState<SuggestedPlant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAvailablePlants()
      .then((data) => {
        console.log("Plants data: ", data); // Ajoutez ce log
        setPlants(data);
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la récupération des plantes disponibles:",
          err
        );
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Plantes disponibles pour échange
        </h1>
        {error ? <p className="text-red-500">{error}</p> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant.id_plante_suggested} plant={plant} />
          ))}
        </div>
      </div>
    </div>
  );
}
