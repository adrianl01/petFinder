import { apiFetch } from './client';

export interface Auth {
  fullname: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export async function createUser({ fullname, email, password }: Auth) {
  return apiFetch('/auth', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      fullname
    })
  });
}

export async function login({ email, password }: Login) {
  return apiFetch<{ jwtRes: string }>('/auth/token', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });
}
