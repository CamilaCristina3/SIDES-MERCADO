export function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken') || null
}

function base64UrlDecode(str) {
  try {
    const pad = (s) => s + '='.repeat((4 - (s.length % 4)) % 4)
   const b64 = pad(str).replace(/-/g, '+').replace(/_/g, '/')
const json = atob(b64)

    return decodeURIComponent(
      json
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  } catch (_) {
    return null
  }
}

export function getUserFromToken() {
  const token = getToken()
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const payloadStr = base64UrlDecode(parts[1])
  if (!payloadStr) return null
  try {
    return JSON.parse(payloadStr)
  } catch (_) {
    return null
  }
}

export function hasRole(required) {
  const user = getUserFromToken()
  if (!user) return false
  if (!required) return true
  const need = Array.isArray(required) ? required : [required]
  return need.includes(user.tipo)
}

