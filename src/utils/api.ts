import axios from "axios";
import {
  User,
  GenericPlant,
  Plant,
  Trade,
  SuggestedPlant,
  WeatherData,
  UpdateUserRequest,
} from "../types/types";

const API_URL = "http://localhost:5000/api"; // Base URL de votre API

// Fonction pour l'authentification
export const login = async (
  username: string,
  password: string
): Promise<any> => {
  console.log("Sending login request", { username, password_user: password });
  const response = await axios.post(`${API_URL}/users/login`, {
    username,
    password_user: password,
  }); // Notez le champ `password_user`
  console.log("Login response", response.data);
  if (response.data.token && response.data.userId) {
    return response.data;
  } else {
    throw new Error(response.data.message || "Login failed");
  }
};

// Fonction pour l'inscription
export async function register(
  username: string,
  email: string,
  password: string
): Promise<any> {
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
}

// Fonction pour l'inscription
// export async function register(
//   username: string,
//   email: string,
//   password: string
// ): Promise<any> {
//   const response = await axios.post(`${API_URL}/users/register`, {
//     username,
//     email_user: email,
//     password_user: password,
//   });
//   return response.data;
// }

// Fonction pour obtenir le profil utilisateur
export async function getProfile(token: string): Promise<any> {
  const response = await axios.get(`${API_URL}/users/profil`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}

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
  } catch (error) {
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

// Fonction pour supprimer une plante suggérée
// export const deleteUserPlant = async (plantId: number): Promise<void> => {
//   const response = await axios.delete(
//     `${API_URL}/plants/deleteUserPlant/${plantId}`
//   );
//   console.log(`API response: ${response.status}`); // Log la réponse de l'API
//   return response.data;
// };
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
      id_plant: plant.id, // Utilisez la propriété correcte ici
      name_plant: plant.name, // Utilisez la propriété correcte ici
    }));
    console.log("Mapped plant names:", plantMap);
    return plantMap;
  } else {
    console.error("Unexpected data format:", response.data);
    throw new Error("Unexpected data format");
  }
};
// Fonction pour ajouter une suggestion de plante
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
  } catch (error) {
    console.error("Error adding plant suggestion:", error);
    throw error;
  }
};

// Fonction pour récupérer les données météo
export const fetchWeather = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}/weather/getWeatherData`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo", error);
    throw new Error("Failed to fetch weather data");
  }
};

// Ajoutez cette fonction pour récupérer toutes les plantes
export const getAllPlants = async (): Promise<Plant[]> => {
  try {
    const response = await axios.get(`${API_URL}/plantsAdvice/getAllPlants`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des plantes:", error);
    throw new Error("Failed to fetch plants data");
  }
};

// Fonction pour obtenir toutes les demandes de troc
export async function getAllTrades(): Promise<Trade[]> {
  try {
    const response = await axios.get(`${API_URL}/trades`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des échanges", error);
    throw error;
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
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la demande d'échange",
      error
    );
    throw error;
  }
}

// Fonction pour obtenir les plantes disponibles pour le troc
export async function getAvailableTrades(): Promise<Plant[]> {
  try {
    const response = await axios.get(`${API_URL}/trades/available`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des plantes disponibles",
      error
    );
    throw error;
  }
}

// Fonction pour supprimer une demande d'échange
export async function deleteTradeRequest(id: number): Promise<any> {
  try {
    const response = await axios.delete(`${API_URL}/trades/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la demande d'échange",
      error
    );
    throw error;
  }
}
