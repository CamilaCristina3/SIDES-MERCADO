export function imageUrl(pathOrName) {
  if (!pathOrName) return '/uploads/images/placeholder.jpg'
  if (typeof pathOrName !== 'string') return '/uploads/images/placeholder.jpg'
  if (pathOrName.startsWith('http://') || pathOrName.startsWith('https://')) return pathOrName
  if (pathOrName.startsWith('/uploads/')) return pathOrName
  return `/uploads/images/${pathOrName}`
}

export function onImgError(e) {
  const fallback = '/uploads/images/placeholder.jpg'
  if (e?.target && e.target.src !== fallback) {
    e.target.src = fallback
  }
}

