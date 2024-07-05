// pages/profil.tsx
"use client";
import AuthMiddleware from "@/middleware/authMiddleware";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProfile,
  updateUser,
  deleteUser,
  getUserPlants,
  deleteUserPlant,
} from "@/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faTrash,
  faLeaf,
  faEdit,
  faKey,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { SuggestedPlant, User, UpdateUserRequest } from "@/types/types";
import Carrousel from "@/components/Carrousel";
import { useAuth } from "@/context/AuthContext";
import MessageList from "@/components/MessageList";
import MessageForm from "@/components/MessageForm";
import NotificationList from "@/components/NotificationList";

export default function Profil() {
  const [user, setUser] = useState<User | null>(null);
  const [plants, setPlants] = useState<SuggestedPlant[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UpdateUserRequest>({
    username: "",
    email_user: "",
    password_user: "",
  });
  const { logout } = useAuth(); // Assurez-vous d'utiliser useAuth ici
  const router = useRouter();

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const data = await getProfile(token);
        console.log("Fetched user profile: ", data); // Log pour vérifier les données récupérées
        if (!data.user) {
          throw new Error(data.message || "Failed to fetch profile");
        }
        setUser(data.user);
        console.log("User id:", data.user.id_user); // Ajoutez ce log pour vérifier que id_user est récupéré
        setUpdatedUser({
          username: data.user.username,
          email_user: data.user.email_user,
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setErrorMessage((error as Error).message);
      }
    };

    fetchProfil();
  }, []);

  useEffect(() => {
    const fetchUserPlants = async () => {
      try {
        if (user && user.id_user) {
          const data = await getUserPlants(user.id_user);
          setPlants(data);
        }
      } catch (error) {
        console.error("Failed to fetch user's plants", error);
      }
    };

    fetchUserPlants();
  }, [user]);

  const handleUpdate = async () => {
    console.log("handleUpdate called"); // Log pour vérifier que la fonction est appelée
    const confirmUpdate = confirm(
      "Êtes-vous sûr de vouloir modifier vos informations ?"
    );
    if (confirmUpdate) {
      console.log("confirmation ok");

      try {
        if (user && user.id_user) {
          console.log("on rentre dans le if");
          const token = localStorage.getItem("token");
          if (!token) {
            console.log("mauvais token");
            throw new Error("User not authenticated");
          }

          const updatedData: UpdateUserRequest = {};
          if (updatedUser.username && updatedUser.username !== user.username) {
            console.log("name changed");
            updatedData.username = updatedUser.username;
          }
          if (
            updatedUser.email_user &&
            updatedUser.email_user !== user.email_user
          ) {
            console.log("email changed");
            updatedData.email_user = updatedUser.email_user;
          }
          if (updatedUser.password_user) {
            console.log("password changed");
            updatedData.password_user = updatedUser.password_user;
          }

          console.log("Updating user with data: ", updatedData);

          await updateUser(updatedData, user.id_user, token);
          console.log("updateUser called successfully");

          // Fetch the updated profile after updating
          const updatedProfile = await getProfile(token);
          setUser(updatedProfile.user);
          setUpdatedUser({
            username: updatedProfile.user.username,
            email_user: updatedProfile.user.email_user,
            password_user: "",
          });

          setEditMode(false);
          alert("Informations mises à jour avec succès !");
        } else {
          console.log("user or user.id_user is null");
        }
      } catch (error) {
        console.error("Failed to update user", error);
        alert("Échec de la mise à jour des informations.");
      }
    } else {
      console.log("Update not confirmed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?"
    );
    if (confirmDelete) {
      try {
        if (user && user.id_user) {
          await deleteUser(user.id_user);
          alert("Compte supprimé avec succès !");
          logout(); // Appel de la fonction de déconnexion après suppression
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
        console.log(`Deleting plant with ID: ${plantId}`); // Log l'ID de la plante
        await deleteUserPlant(plantId);
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
              Nom d utilisateur
            </label>
            {editMode ? (
              <input
                type="text"
                value={updatedUser.username || ""}
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
                value={updatedUser.email_user || ""}
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faKey} className="mr-2" />
              Mot de passe
            </label>
            {editMode ? (
              <input
                type="password"
                value={updatedUser.password_user || ""}
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    password_user: e.target.value,
                  })
                }
                className="text-gray-900 bg-gray-100 p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-900 bg-gray-100 p-2 rounded">****</p>
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
            <Carrousel plants={plants} handleDeletePlant={handleDeletePlant} />

            <div className="mt-6">
              <button
                className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push("/")}
              >
                Retour au Tableau de Bord
              </button>
            </div>
          </div>

          {/* Ajoutez les composants de messagerie */}
          <div className="mt-8">
            <NotificationList />
            <h3 className="text-xl font-bold mb-4 text-teal-500">
              <FontAwesomeIcon icon={faComments} />
              Mes Messages
            </h3>
            {/* <MessageList />
            <MessageForm receiverId={user.id_user} /> */}
          </div>
        </div>
      </div>
    </AuthMiddleware>
  );
}

// // pages/profil.tsx
// "use client";
// import AuthMiddleware from "@/middleware/authMiddleware";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   getProfile,
//   updateUser,
//   deleteUser,
//   getUserPlants,
//   deleteUserPlant,
// } from "@/utils/api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faEnvelope,
//   faTrash,
//   faLeaf,
//   faEdit,
//   faKey,
// } from "@fortawesome/free-solid-svg-icons";
// import { SuggestedPlant, User, UpdateUserRequest } from "@/types/types";
// import Carrousel from "@/components/Carrousel";
// import { useAuth } from "@/context/AuthContext";
// import MessageList from "@/components/MessageList";
// import MessageForm from "@/components/MessageForm";

// export default function Profil() {
//   const [user, setUser] = useState<User | null>(null);
//   const [plants, setPlants] = useState<SuggestedPlant[]>([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState<UpdateUserRequest>({
//     username: "",
//     email_user: "",
//     password_user: "",
//   });
//   const { logout } = useAuth(); // Assurez-vous d'utiliser useAuth ici
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfil = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("User not authenticated");
//         }

//         const data = await getProfile(token);
//         console.log("Fetched user profile: ", data); // Log pour vérifier les données récupérées
//         if (!data.user) {
//           throw new Error(data.message || "Failed to fetch profile");
//         }
//         setUser(data.user);
//         console.log("User id:", data.user.id_user); // Ajoutez ce log pour vérifier que id_user est récupéré
//         setUpdatedUser({
//           username: data.user.username,
//           email_user: data.user.email_user,
//         });
//       } catch (error) {
//         console.error("Failed to fetch profile", error);
//         setErrorMessage((error as Error).message);
//       }
//     };

//     fetchProfil();
//   }, []);

//   useEffect(() => {
//     const fetchUserPlants = async () => {
//       try {
//         if (user && user.id_user) {
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
//     console.log("handleUpdate called"); // Log pour vérifier que la fonction est appelée
//     const confirmUpdate = confirm(
//       "Êtes-vous sûr de vouloir modifier vos informations ?"
//     );
//     if (confirmUpdate) {
//       console.log("confirmation ok");

//       try {
//         if (user && user.id_user) {
//           console.log("on rentre dans le if");
//           const token = localStorage.getItem("token");
//           if (!token) {
//             console.log("mauvais token");
//             throw new Error("User not authenticated");
//           }

//           const updatedData: UpdateUserRequest = {};
//           if (updatedUser.username && updatedUser.username !== user.username) {
//             console.log("name changed");
//             updatedData.username = updatedUser.username;
//           }
//           if (
//             updatedUser.email_user &&
//             updatedUser.email_user !== user.email_user
//           ) {
//             console.log("email changed");
//             updatedData.email_user = updatedUser.email_user;
//           }
//           if (updatedUser.password_user) {
//             console.log("password changed");
//             updatedData.password_user = updatedUser.password_user;
//           }

//           console.log("Updating user with data: ", updatedData);

//           await updateUser(updatedData, user.id_user, token);
//           console.log("updateUser called successfully");

//           // Fetch the updated profile after updating
//           const updatedProfile = await getProfile(token);
//           setUser(updatedProfile.user);
//           setUpdatedUser({
//             username: updatedProfile.user.username,
//             email_user: updatedProfile.user.email_user,
//             password_user: "",
//           });

//           setEditMode(false);
//           alert("Informations mises à jour avec succès !");
//         } else {
//           console.log("user or user.id_user is null");
//         }
//       } catch (error) {
//         console.error("Failed to update user", error);
//         alert("Échec de la mise à jour des informations.");
//       }
//     } else {
//       console.log("Update not confirmed");
//     }
//   };

//   const handleDelete = async () => {
//     const confirmDelete = confirm(
//       "Êtes-vous sûr de vouloir supprimer votre compte ?"
//     );
//     if (confirmDelete) {
//       try {
//         if (user && user.id_user) {
//           await deleteUser(user.id_user);
//           alert("Compte supprimé avec succès !");
//           logout(); // Appel de la fonction de déconnexion après suppression
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
//         console.log(`Deleting plant with ID: ${plantId}`); // Log l'ID de la plante
//         await deleteUserPlant(plantId);
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
//                 value={updatedUser.username || ""}
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
//                 value={updatedUser.email_user || ""}
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
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               <FontAwesomeIcon icon={faKey} className="mr-2" />
//               Mot de passe
//             </label>
//             {editMode ? (
//               <input
//                 type="password"
//                 value={updatedUser.password_user || ""}
//                 onChange={(e) =>
//                   setUpdatedUser({
//                     ...updatedUser,
//                     password_user: e.target.value,
//                   })
//                 }
//                 className="text-gray-900 bg-gray-100 p-2 rounded w-full"
//               />
//             ) : (
//               <p className="text-gray-900 bg-gray-100 p-2 rounded">****</p>
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
//             <Carrousel plants={plants} handleDeletePlant={handleDeletePlant} />

//             <div className="mt-6">
//               <button
//                 className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => router.push("/")}
//               >
//                 Retour au Tableau de Bord
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AuthMiddleware>
//   );
// }
