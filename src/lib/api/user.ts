import { apiFetch } from './client';

import { getToken } from '../storage/token';
import { User } from '@/src/types/user';

export async function getUser(): Promise<User> {
  if (!getToken()) {
    throw new Error("User not authenticated");
  }

  return apiFetch<User>("/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}

export async function getUserReports() {
  if (!getToken()) {
    throw new Error('User not authenticated');
  }

  return apiFetch('/me/reports', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  });
}
