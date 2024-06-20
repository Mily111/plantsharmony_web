// "use client";
// import AuthMiddleware from "@/middleware/authMiddleware";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   getProfile,
//   updateUser,
//   deleteUser,
//   getUserPlants,
//   deleteSuggestedPlant,
// } from "@/utils/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faEnvelope,
//   faTrash,
//   faLeaf,
//   faEdit,
// } from "@fortawesome/free-solid-svg-icons";
// import { SuggestedPlant, User } from "@/types/types";

// export default function Profil() {
//   const [user, setUser] = useState<User | null>(null);
//   const [plants, setPlants] = useState<SuggestedPlant[]>([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({
//     username: "",
//     email_user: "",
//   });
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfil = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("User not authenticated");
//         }

//         const data = await getProfile(token);
//         if (!data.user) {
//           throw new Error(data.message || "Failed to fetch profile");
//         }
//         setUser(data.user);
//         setUpdatedUser({
//           username: data.user.username,
//           email_user: data.user.email_user,
//         });
//       } catch (error) {
//         console.error("Failed to fetch profile", error);
//         setErrorMessage(error.message);
//       }
//     };

//     fetchProfil();
//   }, []);

//   useEffect(() => {
//     const fetchUserPlants = async () => {
//       try {
//         if (user) {
//           const data = await getUserPlants(user.id_user);
//           setPlants(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user's plants", error);
//       }
//     };

//     fetchUserPlants();
//   }, [user]);

//   const handleUpdate = async () => {
//     const confirmUpdate = confirm(
//       "Êtes-vous sûr de vouloir modifier vos informations ?"
//     );
//     if (confirmUpdate) {
//       try {
//         if (user) {
//           await updateUser(updatedUser, user.id_user);
//           setUser({ ...user, ...updatedUser });
//           setEditMode(false);
//           alert("Informations mises à jour avec succès !");
//         }
//       } catch (error) {
//         console.error("Failed to update user", error);
//         alert("Échec de la mise à jour des informations.");
//       }
//     }
//   };

//   const handleDelete = async () => {
//     const confirmDelete = confirm(
//       "Êtes-vous sûr de vouloir supprimer votre compte ?"
//     );
//     if (confirmDelete) {
//       try {
//         if (user) {
//           await deleteUser(user.id_user);
//           alert("Compte supprimé avec succès !");
//           router.push("/"); // Redirect to home page after deletion
//         }
//       } catch (error) {
//         console.error("Failed to delete user", error);
//         alert("Échec de la suppression du compte.");
//       }
//     }
//   };

//   const handleDeletePlant = async (plantId: number) => {
//     const confirmDelete = confirm(
//       "Êtes-vous sûr de vouloir supprimer cette plante ?"
//     );
//     if (confirmDelete) {
//       try {
//         await deleteSuggestedPlant(plantId);
//         setPlants(
//           plants.filter((plant) => plant.id_plante_suggested !== plantId)
//         );
//         alert("Plante supprimée avec succès !");
//       } catch (error) {
//         console.error("Failed to delete plant", error);
//         alert("Échec de la suppression de la plante.");
//       }
//     }
//   };

//   if (errorMessage) {
//     return <div className="text-red-500 text-center">{errorMessage}</div>;
//   }

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <AuthMiddleware>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
//           <h2 className="text-center text-2xl font-bold mb-6 text-teal-500">
//             <FontAwesomeIcon icon={faUser} className="mr-2" />
//             Profil Utilisateur
//           </h2>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               <FontAwesomeIcon icon={faUser} className="mr-2" />
//               Nom d'utilisateur
//             </label>
//             {editMode ? (
//               <input
//                 type="text"
//                 value={updatedUser.username}
//                 onChange={(e) =>
//                   setUpdatedUser({ ...updatedUser, username: e.target.value })
//                 }
//                 className="text-gray-900 bg-gray-100 p-2 rounded w-full"
//               />
//             ) : (
//               <p className="text-gray-900 bg-gray-100 p-2 rounded">
//                 {user.username}
//               </p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
//               Email
//             </label>
//             {editMode ? (
//               <input
//                 type="text"
//                 value={updatedUser.email_user}
//                 onChange={(e) =>
//                   setUpdatedUser({ ...updatedUser, email_user: e.target.value })
//                 }
//                 className="text-gray-900 bg-gray-100 p-2 rounded w-full"
//               />
//             ) : (
//               <p className="text-gray-900 bg-gray-100 p-2 rounded">
//                 {user.email_user}
//               </p>
//             )}
//           </div>

//           <div className="flex space-x-4 mt-6">
//             <button
//               className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
//             >
//               {editMode ? "Enregistrer" : "Modifier"}
//             </button>
//             <button
//               className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//               onClick={handleDelete}
//             >
//               Supprimer
//             </button>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-xl font-bold mb-4 text-teal-500">
//               <FontAwesomeIcon icon={faLeaf} />
//               Mes Plantes à troquer
//             </h3>
//             {plants.length > 0 ? (
//               plants.map((plant) => (
//                 <div
//                   key={plant.id_plante_suggested}
//                   className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded shadow"
//                 >
//                   <div>
//                     <p className="text-gray-900">{plant.name_plant}</p>
//                     <p className="text-gray-600 text-sm">
//                       {plant.quantity_possess}
//                     </p>
//                   </div>
//                   <button
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//                     onClick={() => handleDeletePlant(plant.id_plante_suggested)}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">Aucune plante suggérée</p>
//             )}
//           </div>

//           <div className="mt-6">
//             <button
//               className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => router.push("/")}
//             >
//               Retour au Tableau de Bord
//             </button>
//           </div>
//         </div>
//       </div>
//     </AuthMiddleware>
//   );
// }
"use client";
import AuthMiddleware from "@/middleware/authMiddleware";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProfile,
  updateUser,
  deleteUser,
  getUserPlants,
  deleteSuggestedPlant,
} from "@/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faTrash,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { SuggestedPlant, User } from "@/types/types";

export default function Profil() {
  const [user, setUser] = useState<User | null>(null);
  const [plants, setPlants] = useState<SuggestedPlant[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email_user: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const data = await getProfile(token);
        if (!data.user) {
          throw new Error(data.message || "Failed to fetch profile");
        }
        setUser(data.user);
        setUpdatedUser({
          username: data.user.username,
          email_user: data.user.email_user,
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setErrorMessage(error.message);
      }
    };

    fetchProfil();
  }, []);

  useEffect(() => {
    const fetchUserPlants = async () => {
      try {
        if (user && user.Id_user) {
          // Changer ici en Id_user
          const data = await getUserPlants(user.Id_user); // Changer ici en Id_user
          setPlants(data);
        }
      } catch (error) {
        console.error("Failed to fetch user's plants", error);
      }
    };

    fetchUserPlants();
  }, [user]);

  const handleUpdate = async () => {
    const confirmUpdate = confirm(
      "Êtes-vous sûr de vouloir modifier vos informations ?"
    );
    if (confirmUpdate) {
      try {
        if (user && user.Id_user) {
          // Changer ici en Id_user
          console.log(
            "Updating user",
            user.Id_user,
            "with data: ",
            updatedUser
          );
          await updateUser(updatedUser, user.Id_user); // Changer ici en Id_user
          setUser({ ...user, ...updatedUser });
          setEditMode(false);
          alert("Informations mises à jour avec succès !");
        }
      } catch (error) {
        console.error("Failed to update user", error);
        alert("Échec de la mise à jour des informations.");
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?"
    );
    if (confirmDelete) {
      try {
        if (user && user.Id_user) {
          // Changer ici en Id_user
          await deleteUser(user.Id_user); // Changer ici en Id_user
          alert("Compte supprimé avec succès !");
          router.push("/"); // Redirect to home page after deletion
        }
      } catch (error) {
        console.error("Failed to delete user", error);
        alert("Échec de la suppression du compte.");
      }
    }
  };

  const handleDeletePlant = async (plantId: number) => {
    const confirmDelete = confirm(
      "Êtes-vous sûr de vouloir supprimer cette plante ?"
    );
    if (confirmDelete) {
      try {
        await deleteSuggestedPlant(plantId);
        setPlants(
          plants.filter((plant) => plant.id_plante_suggested !== plantId)
        );
        alert("Plante supprimée avec succès !");
      } catch (error) {
        console.error("Failed to delete plant", error);
        alert("Échec de la suppression de la plante.");
      }
    }
  };

  if (errorMessage) {
    return <div className="text-red-500 text-center">{errorMessage}</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AuthMiddleware>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-center text-2xl font-bold mb-6 text-teal-500">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profil Utilisateur
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Nom d'utilisateur
            </label>
            {editMode ? (
              <input
                type="text"
                value={updatedUser.username}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, username: e.target.value })
                }
                className="text-gray-900 bg-gray-100 p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-900 bg-gray-100 p-2 rounded">
                {user.username}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email
            </label>
            {editMode ? (
              <input
                type="text"
                value={updatedUser.email_user}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email_user: e.target.value })
                }
                className="text-gray-900 bg-gray-100 p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-900 bg-gray-100 p-2 rounded">
                {user.email_user}
              </p>
            )}
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
            >
              {editMode ? "Enregistrer" : "Modifier"}
            </button>
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-teal-500">
              <FontAwesomeIcon icon={faLeaf} />
              Mes Plantes à troquer
            </h3>
            {plants.length > 0 ? (
              plants.map((plant) => (
                <div
                  key={plant.id_plante_suggested}
                  className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded shadow"
                >
                  <div>
                    <p className="text-gray-900">{plant.name_plant}</p>
                    <p className="text-gray-600 text-sm">
                      {plant.quantity_possess}
                    </p>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeletePlant(plant.id_plante_suggested)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucune plante suggérée</p>
            )}
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/")}
            >
              Retour au Tableau de Bord
            </button>
          </div>
        </div>
      </div>
    </AuthMiddleware>
  );
}
