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
  name_plant: string;
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

export interface PlantCardProps {
  plant: {
    Id_plante_suggested: number;
    name_plant: string;
    photo: string;
    state_exchange: string;
    username: string;
  };
}
