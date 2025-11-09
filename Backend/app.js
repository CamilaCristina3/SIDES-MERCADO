// backend/app.js - entrypoint that starts the Express app on configured port
require('dotenv').config()
const app = require('./src/app')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(🚀 SIDES API listening on http://localhost:)
})
