import axios from "axios";
import {
  User,
  GenericPlant,
  Plant,
  Trade,
  Message,
  SuggestedPlant,
  WeatherData,
  UpdateUserRequest,
  Notification,
  LoginResponse,
} from "@/types/types";

const API_URL = "http://localhost:5000/api"; // Base URL de votre API

// Fonction pour l'authentification

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  console.log("Sending login request", { username, password_user: password });

  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/users/login`, {
      username,
      password_user: password,
    });
    console.log("Login response", response.data);

    if (response.status >= 200 && response.status < 300) {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Stockez le token dans le localStorage
        return response.data;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur lors de la connexion:", error.message);
      throw new Error(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue lors de la connexion");
    }
  }
};

// Fonction pour l'inscription
export const register = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      username,
      email_user: email,
      password_user: password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Erreurs de réponse de l'API
        throw new Error(
          `API error: ${error.response.status} ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // Erreurs de requête sans réponse
        throw new Error("No response received from the API");
      } else {
        // Autres erreurs
        throw new Error(`Error: ${error.message}`);
      }
    } else {
      // Erreurs non Axios
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

export const getProfile = async (token: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/profil`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile", error);
    throw new Error("Failed to fetch profile");
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUser = async (
  data: UpdateUserRequest,
  userId: number,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/update/${userId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log("Failed to update user", error.response || error.message); // Log pour vérifier les erreurs
    throw new Error("Failed to update user");
  }
};

// Fonction pour supprimer le compte utilisateur
export const deleteUser = async (userId: number): Promise<any> => {
  const response = await axios.delete(`${API_URL}/users/delete/${userId}`);
  return response.data;
};

// Fonction pour récupérer les plantes suggérées par l'utilisateur
export const getUserPlants = async (
  userId: number
): Promise<SuggestedPlant[]> => {
  const response = await axios.get(`${API_URL}/plants/getUserPlant/${userId}`);
  return response.data;
};

export const getAvailablePlants = async (): Promise<SuggestedPlant[]> => {
  try {
    const response = await axios.get<SuggestedPlant[]>(
      `${API_URL}/plants/available`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des échanges disponibles:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des données"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Fonction pour obtenir les plantes disponibles pour les échanges
export const getAvailablePlantsForTrade = async (): Promise<
  SuggestedPlant[]
> => {
  try {
    const response = await axios.get<SuggestedPlant[]>(
      `${API_URL}/trades/available`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des plantes disponibles:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des données"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

export const requestTrade = async (tradeData: {
  requestedPlantId: number;
  userId: number;
  offeredPlantId: number;
}): Promise<any> => {
  console.log("Sending trade request with data:", tradeData);

  if (
    !tradeData.requestedPlantId ||
    !tradeData.userId ||
    !tradeData.offeredPlantId
  ) {
    throw new Error(
      "Invalid trade data: requestedPlantId, userId, or offeredPlantId is undefined"
    );
  }

  try {
    const response = await axios.post(`${API_URL}/trades/request`, {
      requestedPlantId: tradeData.requestedPlantId,
      userId: tradeData.userId,
      offeredPlantId: tradeData.offeredPlantId,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur lors de la demande de troc:", error.message);
      throw new Error(
        error.response?.data?.message || "Erreur lors de la demande de troc"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Fonction pour obtenir les plantes disponibles pour un utilisateur
export const getAvailablePlantsForUser = async (
  userId: number
): Promise<SuggestedPlant[]> => {
  try {
    const response = await axios.get<SuggestedPlant[]>(
      `${API_URL}/trades/availablePlantsForUser/${userId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des échanges disponibles pour l'utilisateur:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des données"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Fonction pour supprimer une plante utilisateur
export const deleteUserPlant = async (plantId: number): Promise<void> => {
  console.log(`Calling delete API for plant ID: ${plantId}`); // Log pour vérifier l'ID de la plante
  const response = await axios.delete(
    `${API_URL}/plants/deleteUserPlant/${plantId}`
  );
  console.log(`API response: ${response.status}`); // Log la réponse de l'API
  return response.data;
};

// Fonction pour récupérer les noms des plantes
export const fetchPlantNames = async (): Promise<GenericPlant[]> => {
  const response = await axios.get<GenericPlant[]>(
    `${API_URL}/plants/plantsName`
  );
  console.log("API response:", response);

  if (response.data && Array.isArray(response.data)) {
    const plantMap = response.data.map((plant) => ({
      id_plant: plant.id_plant, // Utilisez la propriété correcte ici
      name_plant: plant.name_plant, // Utilisez la propriété correcte ici
    }));
    console.log("Mapped plant names:", plantMap);
    return plantMap;
  } else {
    console.error("Unexpected data format:", response.data);
    throw new Error("Unexpected data format");
  }
};

export const addPlantSuggestion = async (formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/plants/plantSuggestion`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de l'ajout de la suggestion de plante:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de l'ajout de la suggestion de plante"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Fonction pour récupérer les données météo
export const fetchWeather = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}/weather/getWeatherData`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des données météo:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des données météo"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Ajoutez cette fonction pour récupérer toutes les plantes
export const getAllPlants = async (): Promise<Plant[]> => {
  try {
    const response = await axios.get(`${API_URL}/plantsAdvice/getAllPlants`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des plantes:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des plantes"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Fonction pour obtenir toutes les demandes de troc
export async function getAllTrades(): Promise<Trade[]> {
  try {
    const response = await axios.get(`${API_URL}/trades`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des échanges:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des échanges"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
}

// Fonction pour mettre à jour une demande d'échange
export async function updateTradeRequest(
  id: number,
  data: Partial<Trade>
): Promise<any> {
  try {
    const response = await axios.put(`${API_URL}/trades/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la mise à jour de la demande d'échange:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour de la demande d'échange"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
}

// Fonction pour supprimer une demande d'échange
export async function deleteTradeRequest(id: number): Promise<any> {
  try {
    const response = await axios.delete(`${API_URL}/trades/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la suppression de la demande d'échange:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la demande d'échange"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
}

export const createNotification = async (notificationData: {
  userId: number;
  message: string;
  tradeOfferId: number | null;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/notifications/create`,
      notificationData
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la création de la notification:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la création de la notification"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};
// Fonction pour créer une notification
// export const createNotification = async (notificationData: {
//   userId: number;
//   message: string;
//   tradeOfferId: number;
// }): Promise<any> => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/notifications/create`,
//       notificationData
//     );
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         "Erreur lors de la création de la notification:",
//         error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           "Erreur lors de la création de la notification"
//       );
//     } else {
//       console.error("Erreur inconnue:", error);
//       throw new Error("Erreur inconnue");
//     }
//   }
// };

// Fonction pour récupérer les notifications pour un utilisateur
export const getNotificationsForUser = async (
  userId: number
): Promise<Notification[]> => {
  try {
    const response = await axios.get(`${API_URL}/notifications/user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la récupération des notifications:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des notifications"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// Fonction pour marquer une notification comme lue
export const markNotificationAsRead = async (
  notificationId: number
): Promise<any> => {
  try {
    const response = await axios.put(
      `${API_URL}/notifications/read/${notificationId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors du marquage de la notification comme lue:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors du marquage de la notification comme lue"
      );
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Erreur inconnue");
    }
  }
};

// // Fonction pour envoyer une notification
// export const sendNotification = async (notificationData: {
//   userId: number;
//   message: string;
//   tradeOfferId: number | null;
// }): Promise<any> => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/notifications/sendNotification`,
//       notificationData
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Erreur lors de la création de la notification:",
//       error.message
//     );
//     throw new Error(
//       error.response?.data?.message ||
//         "Erreur lors de la création de la notification"
//     );
//   }
// };

// Fonction pour envoyer une notification
// export const sendNotification = async (notificationData: {
//   userId: number;
//   message: string;
//   tradeOfferId: number | null;
// }): Promise<any> => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/notifications/sendNotification`,
//       notificationData
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Erreur lors de la création de la notification:",
//       error.message
//     );
//     throw new Error(
//       error.response?.data?.message ||
//         "Erreur lors de la création de la notification"
//     );
//   }
// };

// Fonction pour mettre à jour le statut de la demande de troc
export const updateTradeOfferStatus = async (
  tradeOfferId: number,
  status: string
): Promise<any> => {
  try {
    const response = await axios.put(
      `${API_URL}/trades/status/${tradeOfferId}/${status}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur lors de la mise à jour du statut de la demande de troc:",
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour du statut de la demande de troc"
      );
    } else {
      console.error("Erreur inconnue lors de la mise à jour du statut:", error);
      throw new Error(
        "Erreur inconnue lors de la mise à jour du statut de la demande de troc"
      );
    }
  }
};

// Fonction pour créer un message
// export const createMessage = async (messageData: {
//   senderId: number;
//   receiverId: number;
//   content: string;
//   tradeId?: number;
// }): Promise<any> => {
//   try {
//     const response = await axios.post(`${API_URL}/messages`, messageData);
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error("Erreur lors de l'envoi du message:", error.message);
//       throw new Error(
//         error.response?.data?.message || "Erreur lors de l'envoi du message"
//       );
//     } else {
//       console.error("Erreur inconnue:", error);
//       throw new Error("Erreur inconnue");
//     }
//   }
// };

// Fonction pour récupérer les messages pour un utilisateur
// export const getMessagesForUser = async (
//   userId: number
// ): Promise<Message[]> => {
//   try {
//     const response = await axios.get<Message[]>(
//       `${API_URL}/messages/user/${userId}`
//     );
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         "Erreur lors de la récupération des messages:",
//         error.message
//       );
//       throw new Error(
//         error.response?.data?.message ||
//           "Erreur lors de la récupération des messages"
//       );
//     } else {
//       console.error("Erreur inconnue:", error);
//       throw new Error("Erreur inconnue");
//     }
//   }
// };
