import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { newProductValidator } from '../../validators';
import { ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

export const newProductValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = Joi.validate(req.body, newProductValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
