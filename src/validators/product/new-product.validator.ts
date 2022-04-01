import * as Joi from 'joi';

import { ProductTypeEnum } from '../../constants';
import { required } from 'joi';

export const newProductValidator = Joi.object({
  title: Joi.string().trim().min(2).max(99).required(),
  description: Joi.string().trim().min(2).max(9999).required(),
  type: Joi.string().trim().valid(Object.values(ProductTypeEnum)).required(),
  category: Joi.string().trim().min(2).max(50).required(),
  price: Joi.number().min(0.1).max(99999).required(),
  hasDiscount: Joi.boolean(),
  oldPrice: Joi.number().min(0.1).max(99999)
    .when('hasDiscount', {is: true, then: required()}),
  tags: Joi.array().items(Joi.string().trim().min(1).max(50))
});
