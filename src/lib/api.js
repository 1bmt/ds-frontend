import { getToken, clearToken } from './auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export async function apiFetch(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  // Auto-logout on expired/invalid token
  if (res.status === 401) {
    clearToken()
    window.location.href = '/login'
    throw new Error('Session expired')
  }

  return res
}
