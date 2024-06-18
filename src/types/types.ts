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
}

// Type pour les plantes avec des informations supplémentaires
export interface Plant {
  id_plant: number; // Assurez-vous que cette propriété correspond à votre base de données
  name_plant: string;
  photo?: string;
  state_exchange?: string;
  username?: string;
}

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
