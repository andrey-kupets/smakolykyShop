import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ActionEnum } from '../../constants';
import { hashPassword } from '../../helpers';
import { mailService, userService } from '../../services';
import { newUserValidator } from '../../validators';
import { IUser } from '../../models';
import { tokenizer } from '../../helpers/tokenizer';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const {error} = Joi.validate(user, newUserValidator);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    await userService.createUser(user);

    const {access_token} = tokenizer(ActionEnum.USER_REGISTER);

    //TODO set token to db

    await mailService.sendMail(user.email, ActionEnum.USER_REGISTER, {token: access_token});

    res.sendStatus(201);
  }
}

export const userController = new UserController();
