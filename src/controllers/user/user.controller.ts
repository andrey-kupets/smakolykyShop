import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ActionEnum } from '../../constants';
import { hashPassword } from '../../helpers';
import { mailService, userService } from '../../services';
import { newUserValidator } from '../../validators';
import { IUser } from '../../models';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const {error} = Joi.validate(user, newUserValidator);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    await userService.createUser(user);
    await mailService.sendMail(user.email, ActionEnum.USER_REGISTER, {token: 'xxx'});

    res.sendStatus(201);
  }
}

export const userController = new UserController();
