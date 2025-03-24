export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Car {
  _id: string;
  name: string;
  type: string;
  price: number;
  location: string;
  image_url: string;
  available: boolean;
  description: string;
  features: string[];
  createdAt: string;
}

export interface Booking {
  _id: string;
  user: string;
  car: Car;
  pickup_date: string;
  return_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SearchParams {
  location?: string;
  type?: string;
  maxPrice?: number;
}