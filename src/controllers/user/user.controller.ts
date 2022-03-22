import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { hashPassword, tokenizer } from '../../helpers';
import { mailService, userService } from '../../services';
import { newUserValidator } from '../../validators';
import { IRequestExtended, IUser } from '../../models';
import { customErrors, ErrorHandler } from '../../errors';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const {error} = Joi.validate(user, newUserValidator);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    const {_id} = await userService.createUser(user);

    const {access_token} = tokenizer(ActionEnum.USER_REGISTER);

    await userService.addActionToken(_id, {action: ActionEnum.USER_REGISTER, token: access_token});

    await mailService.sendMail(user.email, ActionEnum.USER_REGISTER, {token: access_token});

    res.sendStatus(ResponseStatusCodesEnum.CREATED);
  }

  async confirmUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, status, tokens = []} = req.user as IUser;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (status !== UserStatusEnum.PENDING) {
      return next(
        new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_USER_ACTIVATED.message,
          customErrors.BAD_REQUEST_USER_ACTIVATED.code)
      );
    }

    await userService.updateUserByParams({_id}, {status: UserStatusEnum.CONFIRMED});

    const index = tokens.findIndex(({action, token}) => {
      return action === ActionEnum.USER_REGISTER && token === tokenToDelete;
    });

    if (index !== -1) {
      tokens.splice(index, 1);
    }

    await userService.removeActionToken(tokenToDelete as string, index);

    res.end();
  }
}

export const userController = new UserController();
