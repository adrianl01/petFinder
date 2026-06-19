export interface User {
  id: number;
  fullName: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

