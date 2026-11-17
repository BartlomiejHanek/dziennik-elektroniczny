async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Nie można połączyć się z serwerem. Spróbuj ponownie za chwilę.');
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Nie udało się wykonać tej operacji.');
  return payload;
}

export const authApi = {
  session: () => request('/api/auth/me'),
  login: (credentials) => request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (details) => request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(details),
  }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
};
