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
  isActive: true;
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
  isActive: true;
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
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
}
