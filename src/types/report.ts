export interface CreateReportDto {
  name: string;
  species: string;
  breed: string;
  color: string;
  status: 'lost' | 'found';
  phoneNumber: string;
  location: {
    latitude: number;
    longitude: number;
    location: string;
  };
  image?: File;
  isActive: boolean;
}

export interface CreateReportPayload {
  name: string;
  species: string;
  breed: string;
  color: string;
  status: 'lost' | 'found';
  phoneNumber: string;
  location: {
    latitude: number;
    longitude: number;
    location: string;
  };
  imageUrl?: string;
  isActive: boolean;
}

export interface ReportResponse {
  id: number;
  name: string;
  species: string;
  breed: string;
  color: string;
  status: 'lost' | 'found';
  phoneNumber: string;
  location: {
    latitude: number;
    longitude: number;
    location: string;
  };
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
