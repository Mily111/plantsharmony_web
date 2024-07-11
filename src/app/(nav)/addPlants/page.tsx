// "use client";
// import AuthMiddleware from "@/middleware/authMiddleware";
// import React, { useState, useEffect } from "react";
// import { addPlantSuggestion, fetchPlantNames } from "@/utils/api";
// import { GenericPlant } from "@/types/types";
// import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";

// export default function AddPlants() {
//   const { userId } = useAuth(); // Accéder à l'ID utilisateur depuis le contexte
//   const [plantName, setPlantName] = useState<string>("");
//   const [plantNames, setPlantNames] = useState<GenericPlant[]>([]);
//   const [stateExchange, setStateExchange] = useState<string>("disponible");
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   useEffect(() => {
//     async function getPlantNames() {
//       try {
//         const names = await fetchPlantNames();
//         console.log("Fetched plant names:", names); // Log pour vérifier les données
//         setPlantNames(names);
//       } catch (error) {
//         console.error(
//           "Erreur lors de la récupération des noms de plantes",
//           error
//         );
//       }
//     }
//     getPlantNames();
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImage(file);
//     setImagePreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("plantName", plantName);
//     formData.append("stateExchange", stateExchange);
//     if (image) {
//       formData.append("photo", image);
//     }
//     if (userId !== null) {
//       formData.append("userId", userId.toString());
//     }

//     try {
//       const res = await addPlantSuggestion(formData);
//       if (res.message === "Plant suggestion added or updated") {
//         alert("Plante suggérée ajoutée");
//       } else {
//         alert("Erreur lors de l'ajout de la plante suggérée");
//       }
//     } catch (error) {
//       console.error("Erreur ajout plante suggérée", error);
//       alert("Erreur add plante suggérée");
//     }
//   };

//   return (
//     <AuthMiddleware>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//           <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
//             Ajouter une Plante
//           </h1>
//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             className="space-y-4"
//           >
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Nom de la plante</span>
//               </label>
//               <select
//                 value={plantName}
//                 onChange={(e) => setPlantName(e.target.value)}
//                 className="select select-bordered w-full"
//               >
//                 <option value="" disabled>
//                   Choisir un nom de plante
//                 </option>
//                 {plantNames.map((plant) => (
//                   <option key={plant.id_plant} value={plant.name_plant}>
//                     {plant.name_plant}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">État de l'échange</span>
//               </label>
//               <select
//                 value={stateExchange}
//                 onChange={(e) => setStateExchange(e.target.value)}
//                 className="select select-bordered w-full"
//               >
//                 <option value="disponible">Disponible</option>
//                 <option value="indisponible">Indisponible</option>
//               </select>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Photo de la plante</span>
//               </label>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="file-input file-input-bordered w-full"
//               />
//               {imagePreview && (
//                 <div className="mt-4 w-32 h-32 mx-auto relative">
//                   <Image
//                     src={imagePreview}
//                     alt="Preview"
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded"
//                   />
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="btn bg-green-600 hover:bg-green-700 w-full text-white"
//             >
//               Ajouter pour échange
//             </button>
//           </form>
//         </div>
//       </div>
//     </AuthMiddleware>
//   );
// }

// components/AddPlants.js
"use client";
import AuthMiddleware from "@/middleware/authMiddleware";
import React, { useState, useEffect } from "react";
import { addPlantSuggestion, fetchPlantNames } from "@/utils/api";
import { GenericPlant } from "@/types/types";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function AddPlants() {
  const { userId } = useAuth(); // Accéder à l'ID utilisateur depuis le contexte
  const [plantName, setPlantName] = useState<string>("");
  const [plantNames, setPlantNames] = useState<GenericPlant[]>([]);
  const [stateExchange, setStateExchange] = useState<string>("disponible");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    async function getPlantNames() {
      try {
        const names = await fetchPlantNames();
        console.log("Fetched plant names:", names); // Log pour vérifier les données
        setPlantNames(names);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des noms de plantes",
          error
        );
      }
    }
    getPlantNames();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("plantName", plantName);
    formData.append("stateExchange", stateExchange);
    if (image) {
      formData.append("photo", image);
    }
    if (userId !== null) {
      formData.append("userId", userId.toString());
    }

    try {
      const res = await addPlantSuggestion(formData);
      if (res.message === "Plant suggestion added or updated") {
        alert("Plante suggérée ajoutée");
      } else {
        alert("Erreur lors de l'ajout de la plante suggérée");
      }
    } catch (error) {
      console.error("Erreur ajout plante suggérée", error);
      alert("Erreur add plante suggérée");
    }
  };

  return (
    <AuthMiddleware>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Ajouter une Plante
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom de la plante</span>
              </label>
              <select
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Choisir un nom de plante
                </option>
                {plantNames.map((plant) => (
                  <option key={plant.id_plant} value={plant.name_plant}>
                    {plant.name_plant}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">État de l'échange</span>
              </label>
              <select
                value={stateExchange}
                onChange={(e) => setStateExchange(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="disponible">Disponible</option>
                <option value="indisponible">Indisponible</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo de la plante</span>
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {imagePreview && (
                <div className="mt-4 w-32 h-32 mx-auto relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 w-full text-white"
            >
              Ajouter pour échange
            </button>
          </form>
        </div>
      </div>
    </AuthMiddleware>
  );
}
