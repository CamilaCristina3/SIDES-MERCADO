const ASSET_BASE = (import.meta?.env?.VITE_ASSETS_BASE_URL || '').replace(/\/$/, '')

function withBase(path) {
  if (!path) return path
  return ASSET_BASE ? `${ASSET_BASE}${path}` : path
}

export function imageUrl(pathOrName) {
  const fallback = '/uploads/images/placeholder.svg'
  if (!pathOrName || typeof pathOrName !== 'string') return fallback

  // Normalize common development URLs to production path
  const DEV_PREFIXES = [
    'http://localhost:5000/images/',
    'http://127.0.0.1:5000/images/',
    '/images/',
    '/uploads/images/'
  ]
  for (const p of DEV_PREFIXES) {
    if (pathOrName.startsWith(p)) {
      const name = pathOrName.slice(p.length)
      return withBase(`/uploads/images/${encodeURIComponent(name)}`)
    }
  }

  // If it's an absolute URL to somewhere else, use it
  if (pathOrName.startsWith('http://') || pathOrName.startsWith('https://')) return pathOrName

  // If already root-relative, point as-is under uploads
  if (pathOrName.startsWith('/')) return withBase(pathOrName)

  // Treat plain names as files inside uploads/images
  return withBase(`/uploads/images/${encodeURIComponent(pathOrName)}`)
}

export function onImgError(e) {
  const fallback = withBase('/uploads/images/placeholder.svg')
  if (!e?.target) return

  // Try common alternative extensions before giving up
  const current = e.target.getAttribute('src') || ''
  const tried = Number(e.target.dataset.tries || 0)
  const variants = ['.png', '.webp', '.jpg', '.jpeg']

  // First try toggling between apex and www for e-sides domain (hosting quirks / hotlink protection)
  try {
    const url = new URL(current, window.location.origin)
    if (!e.target.dataset.hostSwapped && (url.hostname === 'e-sides.co.mz' || url.hostname === 'www.e-sides.co.mz')) {
      e.target.dataset.hostSwapped = '1'
      url.hostname = url.hostname === 'e-sides.co.mz' ? 'www.e-sides.co.mz' : 'e-sides.co.mz'
      e.target.src = url.toString()
      return
    }
  } catch {}

  // Replace only the extension at the end of the filename
  const hasExt = /\.[a-zA-Z0-9]+(?=($|\?))/.test(current)
  if (tried < variants.length && hasExt) {
    e.target.dataset.tries = String(tried + 1)
    e.target.src = current.replace(/\.[a-zA-Z0-9]+(?=($|\?))/, variants[tried])
    return
  }

  if (e.target.src !== fallback) {
    e.target.src = fallback
  }
}
