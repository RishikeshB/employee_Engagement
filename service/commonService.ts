const BASE_URL = 'https://emp-eng.azurewebsites.net';

export const apiService = {
  async get(path: string, params: Record<string, any> = {}) {
    const url = new URL(`${BASE_URL}/${path}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString());
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'API GET request failed');
    return data;
  },

  async post(path: string, body: any) {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'API POST request failed');
    return data;
  },

  async put(path: string, body: any) {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'API PUT request failed');
    return data;
  },

  async delete(path: string) {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'API DELETE request failed');
    return data;
  },
};
