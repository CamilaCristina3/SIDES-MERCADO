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
  const headers = { Accept: 'application/json', ...(options.headers || {}) }
  return fetch(url, { ...options, headers })
}

function looksJson(resp) {
  const ct = resp?.headers?.get?.('content-type') || ''
  return ct.includes('application/json') || ct.includes('application/problem+json')
}

export async function apiFetchJson(path, options = {}) {
  const resp = await apiFetch(path, options)
  let data = null
  try {
    if (looksJson(resp)) {
      data = await resp.json()
    } else {
      const text = await resp.text()
      data = text ? JSON.parse(text) : null
    }
  } catch {
    data = null
  }
  return { resp, data }
}

export const API_BASE = RAW_BASE
