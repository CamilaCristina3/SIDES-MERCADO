// Centralized API helper for production/dev
// Configure the backend base URL via Vite env var:
//   VITE_API_BASE_URL=https://your-backend.example.com/api
// If not set, defaults to same-origin '/api'.

const RAW_BASE = import.meta?.env?.VITE_API_BASE_URL || '/api'

function joinUrl(base, path) {
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return `${b}${p}`
}

export function apiUrl(path = '/') {
  return joinUrl(RAW_BASE, path)
}

export async function apiFetch(path, options = {}) {
  const url = apiUrl(path)
  return fetch(url, options)
}

export const API_BASE = RAW_BASE

