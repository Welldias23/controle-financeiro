const joi = require('joi')

const schemaLoginUsers = joi.object({
  email: joi.string().email().messages({
    'any.required': 'O campo email é obrigatorio.',
    'string.email': 'Email invalido.',
  }),
  password: joi.string().min(6).required().messages({
    'any.required': 'O campo senha é obrigatorio.',
    'string.min': 'A senha precisa ter no minimo 6 caracteres.',
  }),
})

module.exports = schemaLoginUsers