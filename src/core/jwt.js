const jwt = require("jsonwebtoken")

const generateToken = (data, time) => {
  const token = jwt.sign(data, process.env.PASS_JWT, {expiresIn: time})
  return token
}

const verifyToken = (token) => {
  const token = jwt.verify(token, process.env.PASS_JWT)
  return tokenjsonwebtoken
} 

module.exports = {
    generateToken,
    verifyToken
}