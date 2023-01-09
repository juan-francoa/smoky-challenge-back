const joi = require("joi");

const schemaReaction = joi.object({
  name: joi.string().min(3).max(50).required().messages({
    "any.required": "name is required, please introduce it",
    "string.empty": "You missed the field name",
    "string.min": "You need three letteres minimum in name",
    "string.max": "You need three letteres maximiun in name",
  }),
  photo: joi.string().uri().required().messages({
    "any.required": "photo is required, please introduce it",
    "string.empty": "You missed the field photo",
  }),
  category: joi.string().required().messages({
    "string.empty": "category is required, please introduce it.",
    "any.required": "category is required.",
  }),
  description: joi.string().required().messages({
    "any.required": "The description is required, please complete it.",
    "string.empty": "The description is required, please enter it.",
  }),
  amount: joi.number().required().messages({
    "any.required": "amount is required, please introduce it",
    "string.empty": "You missed the field amount",
  }),
  price: joi.number().required().messages({
    "any.required": "price is required, please introduce it",
    "string.empty": "You missed the field price",
  }),
});

module.exports = schemaReaction;
