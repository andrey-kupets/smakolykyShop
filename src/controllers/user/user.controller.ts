import { NextFunction, Request, Response } from 'express';

import { ActionEnum, LogEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { hashPassword, tokenizer } from '../../helpers';
import { logService, mailService, userService } from '../../services';
import { IRequestExtended, IUser } from '../../models';
import { customErrors, ErrorHandler } from '../../errors';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;

    user.password = await hashPassword(user.password);

    const {_id} = await userService.createUser(user);
    const {access_token} = tokenizer(ActionEnum.USER_REGISTER);

    await userService.addActionToken(_id, {action: ActionEnum.USER_REGISTER, token: access_token});
    await mailService.sendMail(user.email, ActionEnum.USER_REGISTER, {token: access_token});
    await logService.createLog({event: LogEnum.USER_REGISTER, userId: _id});

    res.sendStatus(ResponseStatusCodesEnum.CREATED);
  }

  async confirmUser(req: IRequestExtended, res: Response, next: NextFunction) {
    // const {_id, status, tokens = []} = req.user as IUser; // for 1st way
    const {_id, status} = req.user as IUser; // for 2nd way
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

    // // 1st way by js
    // const index = tokens.findIndex(({action, token}) => action === ActionEnum.USER_REGISTER && token === tokenToDelete);
    //
    // if (index !== -1) {
    //   tokens.splice(index, 1);
    //
    //   await userService.updateUserByParams({_id}, {tokens} as Partial<IUser>);
    // }

    // // 2nd way by mongo
    // await userService.removeActionToken(tokenToDelete as string, index as number); // for 2.1-way  $unset
    await userService.removeActionToken(tokenToDelete as string); // for 2.2-way $pull
    await logService.createLog({event: LogEnum.USER_CONFIRMED, userId: _id});

    res.end();
  }

  async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, email} = req.user as IUser;

    const {access_token} = tokenizer(ActionEnum.FORGOT_PASSWORD);

    await userService.addActionToken(_id, {action: ActionEnum.FORGOT_PASSWORD, token: access_token});
    await mailService.sendMail(email, ActionEnum.FORGOT_PASSWORD, {token: access_token});

    res.end();
  }
}

export const userController = new UserController();
