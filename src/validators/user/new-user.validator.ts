import * as Joi from 'joi';

export const newUserValidator = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .trim()
    .min(2)
    .max(24)
    .required(),
  surname: Joi
    .string()
    .trim()
    .min(2)
    .max(48)
    .required(),
  email: Joi // TODO const
    .string()
    .trim()
    .required(),
  password: Joi // TODO const
    .string()
    .trim()
    .required(),
  age: Joi
    .number()
    .integer()
    .min(1)
    .max(120)
    .required(),
  phone: Joi // TODO const
    .string()
    .trim(),
  gender: Joi
    .string()
    .trim()
    .allow('male', 'female')
    .required()
});
