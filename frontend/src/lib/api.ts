export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  
    const tokenRes = await fetch("/api/auth/token");
  const { token } = await tokenRes.json();

  if (!token) {
    throw new Error("No hay sesión activa");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204) return null;

  return response.json();
}