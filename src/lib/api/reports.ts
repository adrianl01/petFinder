import { apiFetch } from './client';

import { getUserLocation } from '../storage/location';
import { uploadImage } from './cloudinary';
import { CreateReportDto, CreateReportPayload, ReportResponse } from '@/src/types/report';

export async function getReportsNearMe(radius = 50000) {
  const location = getUserLocation();

  if (!location) {
    throw new Error('User location not found');
  }

  const { latitude, longitude } = location;
  return apiFetch(`/reports?latitude=${latitude}&longitude=${longitude}&radius=${radius}`) as Promise<ReportResponse[]>;
}

export async function getMyReports(token: string): Promise<ReportResponse[]> {
  return apiFetch('/me/reports', { headers: { Authorization: `Bearer ${token}` } });
}

export async function getReportById(token: string, id: string) {
  return apiFetch(`/me/reports/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export async function createReport(token: string, data: CreateReportDto) {
  let imageUrl: string | undefined;
  console.log(token, data);

  if (data.image) {
    imageUrl = await uploadImage(data.image, token);
  }

  const payload: CreateReportPayload = {
    name: data.name,
    species: data.species,
    breed: data.breed,
    color: data.color,
    status: data.status,
    location: data.location,
    imageUrl,
    isActive: data.isActive,
    phoneNumber: data.phoneNumber
  };

  return apiFetch('/reports', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export async function updateReport(token: string, reportId: string, data: Report) {
  return apiFetch(`/me/reports/${reportId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function deleteReport(token: string, reportId: string) {
  return apiFetch(`/me/reports/${reportId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
