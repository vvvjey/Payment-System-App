import { API_URL } from '../constants';

export const apiRequest = async (endpoint: string, method: string = 'GET', body: any = null) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
  return response.json();
};
