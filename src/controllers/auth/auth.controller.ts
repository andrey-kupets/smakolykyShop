import { NextFunction, Response } from 'express';

import { ActionEnum, ResponseStatusCodesEnum } from '../../constants';
import { IRequestExtended, IUser } from '../../models';
import { comparePasswords, tokenizer } from '../../helpers';
import { authService } from '../../services';
import { customErrors, ErrorHandler } from '../../errors';

class AuthController {
  async authUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id, password} = req.user as IUser;
      const authInfo = req.body;

      const doPasswordsEqual = await comparePasswords(authInfo.password, password);

      if (!doPasswordsEqual) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      const {access_token, refresh_token} = tokenizer(ActionEnum.USER_AUTH);

      await authService.createTokenPair({
        accessToken: access_token,
        refreshToken: refresh_token,
        userId: _id
      });

      res.json({access_token, refresh_token});
    } catch (e) {
      return next(e);
    }
  }
}

export const authController = new AuthController();
