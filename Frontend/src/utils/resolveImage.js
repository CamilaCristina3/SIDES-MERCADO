// Prefer serving images from the root `/images` directory.
// This module normalizes product image paths to `/images/...` without
// touching other helpers or configs.

function deriveFilenameFromName(name) {
  try {
    const base = String(name || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ')
    if (!base) return null
    return `${base}.png`
  } catch {
    return null
  }
}

function toImagesPath(filenameOrPath) {
  const s = String(filenameOrPath || '').trim()
  if (!s) return '/images/placeholder.svg'

  // Absolute external URL
  if (s.startsWith('http://') || s.startsWith('https://')) return s

  // Already a root path: normalize any legacy '/uploads/images/' to '/images/'
  if (s.startsWith('/')) {
    return s.replace(/^\/uploads\/images\//, '/images/')
  }

  // Plain filename → serve from /images
  return `/images/${encodeURIComponent(s)}`
}

export function resolveProductImage(product) {
  if (!product || typeof product !== 'object') return '/images/placeholder.svg'
  const src = product.imagem || product.image || product.imageUrl || product.img
  if (typeof src === 'string' && src.trim()) return toImagesPath(src)
  const fromName = deriveFilenameFromName(product.nome || product.name)
  if (fromName) return toImagesPath(fromName)
  return '/images/placeholder.svg'
}
