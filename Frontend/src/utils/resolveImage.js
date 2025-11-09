import { imageUrl } from './imageUrl'

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
    return ${base}.png
  } catch {
    return null
  }
}

export function resolveProductImage(product) {
  if (!product || typeof product !== 'object') return imageUrl('placeholder.svg')
  const src = product.imagem || product.image || product.imageUrl || product.img
  if (typeof src === 'string' && src.trim()) return imageUrl(src.trim())
  const fromName = deriveFilenameFromName(product.nome || product.name)
  if (fromName) return imageUrl(fromName)
  return imageUrl('placeholder.svg')
}
