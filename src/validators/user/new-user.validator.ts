import * as Joi from 'joi';
import { GenderEnum, RegExpEnum } from '../../constants';

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
  email: Joi
    .string()
    .trim()
    .regex(RegExpEnum.email)
    .required(),
  password: Joi
    .string()
    .trim()
    .regex(RegExpEnum.password)
    .required(),
  age: Joi
    .number()
    .integer()
    .min(1)
    .max(120)
    .required(),
  phone: Joi
    .string()
    .trim()
    .regex(RegExpEnum.phone),
  gender: Joi
    .string()
    .trim()
    .allow(GenderEnum.MALE, GenderEnum.FEMALE)
    .required()
});
