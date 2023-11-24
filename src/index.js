require('dotenv').config()
const express = require('express')
const routesUsers = require("./routes/users")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(routesUsers)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
