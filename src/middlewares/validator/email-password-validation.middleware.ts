import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { emailPasswordValidator } from '../../validators';
import { ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

export const emailPasswordValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = Joi.validate(req.body, emailPasswordValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};

