// types.ts

export interface User {
  id_user: number;
  username: string;
  email_user: string;
  password_user?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email_user?: string;
  password_user?: string;
}

// Type pour les plantes génériques
export interface GenericPlant {
  id_plant: number;
  name_plant: string;
}

// Type pour les plantes suggérées
export interface SuggestedPlant {
  id_plante_suggested: number;
  quantity_possess: number;
  date_possess: string;
  photo: string;
  state_exchange: string;
  id_user: number;
  id_plant: number;
  name_plant: string; // Ajouté
  username: string; // Ajouté
}

// Type pour les plantes avec des informations supplémentaires
export interface Plant {
  id_plant?: number; // Assurez-vous que cette propriété correspond à votre base de données
  name_plant: string;
  plant_type_name: string;
  label_soil_type: string;
  humidity_level: string;
  light_level: string;
  photo?: string;
  state_exchange?: string;
  username?: string;
}

// Type pour les échanges
export interface Trade {
  Id_request: number;
  Id_user: number;
  Id_plante_suggested: number;
  Id_plante_suggested_1?: number;
  date_request?: string;
  date_validation?: string;
  state_exchange?: string;
  photo?: string;
  name_plant: string;
  username: string;
}

// Type pour les données météo
export interface WeatherData {
  location: string;
  temperature: string;
  condition: string;
  windSpeed: string;
}

// Interface pour les propriétés du carrousel
export interface CarrouselProps {
  plants: SuggestedPlant[];
  handleDeletePlant: (plantId: number) => void;
}

// export interface PlantCardProps {
//   plant: {
//     Id_plante_suggested: number;
//     name_plant: string;
//     photo: string;
//     state_exchange: string;
//     username: string;
//   };
// }
export interface PlantCardProps {
  plant: SuggestedPlant;
}
// Fonction de conversion de Plant en SuggestedPlant
export const convertPlantToSuggestedPlant = (plant: Plant): SuggestedPlant => {
  return {
    id_plante_suggested: plant.id_plant!, // ou une autre logique pour obtenir cette valeur
    quantity_possess: 1, // valeur par défaut ou autre logique
    date_possess: new Date().toISOString(), // valeur par défaut ou autre logique
    photo: plant.photo || "",
    state_exchange: plant.state_exchange || "",
    id_user: 1, // valeur par défaut ou autre logique
    id_plant: plant.id_plant || 0,
    name_plant: plant.name_plant,
  };
};

export interface Trade {
  Id_request: number;
  requestedPlantId: number;
  userId: number;
  offeredPlantId: number;
  status: string;
  offered_photo: string;
  requested_photo: string;
  offered_name: string;
  requested_name: string;
}

export interface TradeRequestModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (offeredPlantId: number) => Promise<void>;
  userPlants: SuggestedPlant[];
  userId: number; // Assurez-vous que cette propriété est présente
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  trade_id?: number;
  date_sent: string;
  sender_username: string;
}

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  trade_offer_id: number | null;
  read_status: boolean;
}
