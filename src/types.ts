export interface Agent {
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}

export type PropertyType = "Villa" | "Penthouse" | "Townhome" | "Apartment";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  agent: Agent;
  yearBuilt: number;
  status: "For Sale" | "For Rent";
  isFeatured?: boolean;
}

export interface BookingRequest {
  propertyId: string;
  propertyName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: "Pending" | "Confirmed";
}

export interface NewListingInput {
  title: string;
  type: PropertyType;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  status: "For Sale" | "For Rent";
}
