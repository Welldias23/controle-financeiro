const bcrypt = require("bcrypt")

const cryptographyPassword = (password) => {
    return bcrypt.hash(password, 10)
}

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

module.exports = {
    cryptographyPassword,
    comparePassword
}