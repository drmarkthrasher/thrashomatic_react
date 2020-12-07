import Joi from "@hapi/joi";

const firstname = Joi.string()
  .alphanum()
  .max(254)
  .required()
  .label("Firstname");
const lastname = Joi.string()
  .alphanum()
  .max(254)
  .required()
  .label("Lastname");
const email = Joi.string()
  .email()
  .required()
  .label("Email");
const password = Joi.string()
  .required()
  .label("Password");

export const register = Joi.object().keys({
  firstname,
  lastname,
  email,
  password
});

export const login = Joi.object().keys({
  email,
  password
});
