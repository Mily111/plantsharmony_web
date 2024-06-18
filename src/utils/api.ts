import { Plant, Trade } from "../types/types";
import axios from "axios";
import { GenericPlant, SuggestedPlant } from "../types/types";
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
  const response = await axios.post(`${API_URL}/users/register`, {
    username,
    email_user: email,
    password_user: password,
  });
  return response.data;
}

// Fonction pour obtenir le profil utilisateur
export async function getProfile(token: string): Promise<any> {
  const response = await axios.get(`${API_URL}/users/profil`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}

// Fonction pour récupérer les noms des plantes
export const fetchPlantNames = async (): Promise<GenericPlant[]> => {
  const response = await axios.get<GenericPlant[]>(
    `${API_URL}/plants/plantsName`
  );
  return response.data.map((plant) => ({
    id_plant: plant.id_plant,
    name_plant: plant.name_plant,
  }));
};

// Fonction pour ajouter une suggestion de plante
export const addPlantSuggestion = async (formData: FormData): Promise<any> => {
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
