const Joi = require('joi');

const id = Joi.string().alphanum().length(24);
const name = Joi.string().min(3).max(70);

const createUsserSchema = Joi.object({
  name: name.required(),
})

const updateUserSchema = Joi.object({
  name: name,
  id_chat: id,
})

const getUserSchema = Joi.object({
  id: id.required(),
})


module.exports = { createUsserSchema, updateUserSchema, getUserSchema };
