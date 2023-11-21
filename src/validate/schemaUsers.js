const joi = require('joi')

const schemaUsers = joi.object({
  name: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatorio.',
    'string.base': 'O nome precisa ser string.',
  }),
  lastname: joi.string().required().messages({
    'any.required': 'O campo sobrenome é obrigatorio.',
    'string.base': 'O sobrenome precisa ser string.',
  }),
  email: joi.string().email().messages({
    'any.required': 'O campo email é obrigatorio.',
    'string.email': 'Email invalido.',
  }),
  password: joi.string().min(6).required().messages({
    'any.required': 'O campo senha é obrigatorio.',
    'string.min': 'A senha precisa ter no minimo 6 caracteres.',
  }),
})

module.exports = schemaUsers