const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

export async function apiRequest(
  path: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Request failed');
  }

  return res.json();
}
