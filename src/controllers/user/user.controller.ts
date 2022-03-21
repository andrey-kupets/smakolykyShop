import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ActionEnum } from '../../constants';
import { hashPassword, tokenizer } from '../../helpers';
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

    const { _id } = await userService.createUser(user);

    const {access_token} = tokenizer(ActionEnum.USER_REGISTER);

    await userService.addActionToken(_id, { action: ActionEnum.USER_REGISTER, token: access_token });

    await mailService.sendMail(user.email, ActionEnum.USER_REGISTER, {token: access_token});

    res.sendStatus(201);
  }

  confirmUser(req: Request, res: Response, next: NextFunction) {

    res.end();
  }
}

export const userController = new UserController();
