export function getToken() {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem('petfinder_token');
}

export function setToken(token: string) {
  localStorage.setItem('petfinder_token', token);
}

export function removeToken() {
  localStorage.removeItem('petfinder_token');
}
