const { Router } = require('express')
const { registerUser, loginUser, detailUser, updateUser, deleteUser } = require('../controllers/users')
const validateBody = require('../middleware/validateBody')
const validateToken = require("../middleware/validateToken")
const schemaUsers = require('../validate/schemaUsers')
const schemaLoginUsers = require('../validate/schemaLoginUsers')
const route = Router()

route.post('/usuario', validateBody(schemaUsers), registerUser)
route.post('/login', validateBody(schemaLoginUsers), loginUser)

route.use(validateToken)

route.get('/usuario', detailUser)
route.put('/usuario', validateBody(schemaUsers), updateUser)
route.delete('/usuario/:id', deleteUser)

module.exports = route