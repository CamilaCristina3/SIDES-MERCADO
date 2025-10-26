const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const src = path.join(root, '.htaccess')
const dstDir = path.join(root, 'dist')
const dst = path.join(dstDir, '.htaccess')

try {
  if (fs.existsSync(src) && fs.existsSync(dstDir)) {
    fs.copyFileSync(src, dst)
    console.log('Copied .htaccess to dist/')
  } else {
    console.log('.htaccess or dist/ not found; skipping copy')
  }
} catch (e) {
  console.error('Failed to copy .htaccess into dist:', e)
  process.exitCode = 1
}

