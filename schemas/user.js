const joi = require('joi')

const schema = joi.object({
    name: joi.string()
        .required()
        .min(3)
        .max(30)
        .messages({
            'any.required': 'name is required',
            'string.empty': 'name is required',
            'string.min': 'A minimum of 3 characters is requested',
            'string.max': 'A maximum of 30 characters is requested'
        }),
    lastName: joi.string()
        .required()
        .min(3)
        .max(30)
        .messages({
            'any.required': 'lastName is required',
            'string.empty': 'lastName is required',
            'string.min': 'A minimum of 3 characters is requested',
            'string.max': 'A maximum of 30 characters is requested'
        }),
    role: joi.string()
        .valid('user', 'admin'),
    photo: joi.string()
        .required()
        .uri()
        .messages({
            'any.required': 'Image is require',
            'string.empty': 'Image is require',
            'string.uri': 'A valid url is requested'
        }),
    age: joi.number()
        .required()
        .min(18)
        .messages({
            'any.required': 'Age is required',
            'number.empty': 'Age is required',
            'number.min': 'You must be over 18 years old'
        }),
    email: joi.string()
        .required()
        .email({ minDomainSegments: 2 })
        .messages({
            'any.required': 'Email is required',
            'string.empty': 'Email is required',
            'string.email': 'Must be a valid email'
        }),
    password: joi.string()
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.empty': 'Password is required',
        }),
})

module.exports = schema