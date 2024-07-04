// "use client";

// import AuthMiddleware from "@/middleware/authMiddleware";
// import React, { useEffect, useState } from "react";
// import {
//   getAvailablePlantsForTrade,
//   getAvailablePlantsForUser,
//   requestTrade,
//   createNotification,
// } from "@/utils/api";
// import { SuggestedPlant } from "@/types/types";
// import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";
// import TradeRequestModal from "@/components/TradeRequestModal";

// export default function TrocPlants() {
//   const [plants, setPlants] = useState<SuggestedPlant[]>([]);
//   const [userPlants, setUserPlants] = useState<SuggestedPlant[]>([]);
//   const [selectedPlant, setSelectedPlant] = useState<SuggestedPlant | null>(
//     null
//   );
//   const [modalVisible, setModalVisible] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { userId } = useAuth(); // Assurez-vous que vous avez accès à l'ID utilisateur

//   useEffect(() => {
//     getAvailablePlantsForTrade()
//       .then((data) => {
//         console.log("Plants data: ", data); // Ajoutez ce log
//         setPlants(data);
//       })
//       .catch((err: any) => {
//         console.error(
//           "Erreur lors de la récupération des plantes disponibles:",
//           err.message
//         );
//         setError(err.message);
//       });

//     if (userId) {
//       getAvailablePlantsForUser(userId)
//         .then((data) => {
//           console.log("User Plants data: ", data); // Ajoutez ce log
//           setUserPlants(data);
//         })
//         .catch((error: any) => console.error(error.message));
//     }
//   }, [userId]);

//   const handleRequestTrade = async (requestedPlantId: number) => {
//     if (!selectedPlant) {
//       alert("Veuillez sélectionner une de vos plantes pour l'échange");
//       return;
//     }
//     try {
//       if (!userId) {
//         alert("Erreur : utilisateur non authentifié.");
//         return;
//       }
//       const res = await requestTrade({
//         requestedPlantId,
//         userId,
//         offeredPlantId: selectedPlant.id_plante_suggested,
//       });
//       if (res.message === "Trade offer created successfully") {
//         alert("Demande de troc envoyée avec succès");
//       } else {
//         alert("Erreur lors de la création de la demande de troc");
//       }
//     } catch (error: any) {
//       console.error("Error requesting trade:", error.message);
//       alert("Erreur lors de la demande de troc");
//     }
//   };

//   const handleModalSubmit = async (offeredPlantId: number) => {
//     if (!userId) {
//       alert("Erreur : utilisateur non authentifié.");
//       return;
//     }
//     try {
//       const res = await requestTrade({
//         requestedPlantId: selectedPlant!.id_plante_suggested,
//         userId,
//         offeredPlantId,
//       });
//       if (res.message === "Trade offer created successfully") {
//         // Créer une notification après la création de l'offre de troc
//         const offeredPlantName = userPlants.find(
//           (p) => p.id_plante_suggested === offeredPlantId
//         )?.name_plant;
//         const requestedPlantName = selectedPlant?.name_plant;
//         const notificationMessage = `L'utilisateur ${userId} vous demande si vous acceptez sa demande de troc : échange de ${offeredPlantName} contre ${requestedPlantName}.`;
//         await createNotification({
//           userId: selectedPlant!.id_user, // Utilisez 'id_user' au lieu de 'Id_user'
//           message: notificationMessage,
//           tradeOfferId: res.tradeOfferId,
//         });
//         alert("Demande de troc envoyée avec succès");
//         setModalVisible(false);
//       } else {
//         alert("Erreur lors de la création de la demande de troc");
//       }
//     } catch (error: any) {
//       console.error("Error requesting trade:", error.message);
//       alert("Erreur lors de la demande de troc");
//     }
//   };

//   return (
//     <AuthMiddleware>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Demandes de troc de plantes</h1>
//         {error ? <p className="text-red-500">{error}</p> : null}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {plants.map((plant) => (
//             <div
//               key={plant.id_plante_suggested}
//               className="card bg-base-100 shadow-xl mb-4"
//             >
//               <div className="card-body">
//                 <h2 className="card-title">{plant.name_plant}</h2>
//                 <div className="relative w-full h-48 mb-4">
//                   <Image
//                     src={`/${plant.photo}`}
//                     alt={plant.name_plant}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-t-lg"
//                   />
//                 </div>
//                 <p>Proposé par: {plant.username}</p>
//                 <button
//                   onClick={() => {
//                     setSelectedPlant(plant);
//                     setModalVisible(true);
//                   }}
//                   className="btn btn-primary mt-2"
//                 >
//                   Demander un troc
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <TradeRequestModal
//           visible={modalVisible}
//           onCancel={() => setModalVisible(false)}
//           onSubmit={handleModalSubmit}
//           userId={userId as number}
//           userPlants={userPlants}
//         />
//       </div>
//     </AuthMiddleware>
//   );
// }

"use client";

import AuthMiddleware from "@/middleware/authMiddleware";
import React, { useEffect, useState } from "react";
import {
  getAvailablePlantsForTrade,
  getAvailablePlantsForUser,
  requestTrade,
  createNotification,
} from "@/utils/api";
import { SuggestedPlant } from "@/types/types";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import TradeRequestModal from "@/components/TradeRequestModal";

export default function TrocPlants() {
  const [plants, setPlants] = useState<SuggestedPlant[]>([]);
  const [userPlants, setUserPlants] = useState<SuggestedPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<SuggestedPlant | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    getAvailablePlantsForTrade()
      .then((data) => {
        console.log("Plants data: ", data);
        setPlants(data);
      })
      .catch((err: any) => {
        console.error(
          "Erreur lors de la récupération des plantes disponibles:",
          err.message
        );
        setError(err.message);
      });

    if (userId) {
      getAvailablePlantsForUser(userId)
        .then((data) => setUserPlants(data))
        .catch((error: any) => console.error(error.message));
    }
  }, [userId]);

  const handleRequestTrade = async (requestedPlantId: number) => {
    if (!selectedPlant) {
      alert("Veuillez sélectionner une de vos plantes pour l'échange");
      return;
    }
    try {
      if (!userId) {
        alert("Erreur : utilisateur non authentifié.");
        return;
      }
      const res = await requestTrade({
        requestedPlantId,
        userId,
        offeredPlantId: selectedPlant.id_plante_suggested,
      });
      if (res.message === "Trade offer created successfully") {
        alert("Demande de troc envoyée avec succès");
      } else {
        alert("Erreur lors de la création de la demande de troc");
      }
    } catch (error: any) {
      console.error("Error requesting trade:", error.message);
      alert("Erreur lors de la demande de troc");
    }
  };

  const handleModalSubmit = async (offeredPlantId: number) => {
    if (!userId) {
      alert("Erreur : utilisateur non authentifié.");
      return;
    }
    try {
      const res = await requestTrade({
        requestedPlantId: selectedPlant!.id_plante_suggested,
        userId,
        offeredPlantId,
      });
      if (res.message === "Trade offer created successfully") {
        const offeredPlantName = userPlants.find(
          (p) => p.id_plante_suggested === offeredPlantId
        )?.name_plant;
        const requestedPlantName = selectedPlant?.name_plant;
        const notificationMessage = `L'utilisateur ${userId} vous demande si vous acceptez sa demande de troc : échange de ${offeredPlantName} contre ${requestedPlantName}.`;
        await createNotification({
          userId: selectedPlant!.id_user,
          message: notificationMessage,
          tradeOfferId: res.tradeOfferId,
        });
        alert("Demande de troc envoyée avec succès");
        setModalVisible(false);
      } else {
        alert("Erreur lors de la création de la demande de troc");
      }
    } catch (error: any) {
      console.error("Error requesting trade:", error.message);
      alert("Erreur lors de la demande de troc");
    }
  };

  return (
    <AuthMiddleware>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Demandes de troc de plantes</h1>
        {error ? <p className="text-red-500">{error}</p> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div
              key={plant.id_plante_suggested}
              className="card bg-base-100 shadow-xl mb-4"
            >
              <div className="card-body">
                <h2 className="card-title">{plant.name_plant}</h2>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`/${plant.photo}`}
                    alt={plant.name_plant}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <p>Proposé par: {plant.username}</p>
                <button
                  onClick={() => {
                    setSelectedPlant(plant);
                    setModalVisible(true);
                  }}
                  className="btn btn-primary mt-2"
                >
                  Demander un troc
                </button>
              </div>
            </div>
          ))}
        </div>
        <TradeRequestModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleModalSubmit}
          userId={userId as number}
          userPlants={userPlants}
        />
      </div>
    </AuthMiddleware>
  );
}
