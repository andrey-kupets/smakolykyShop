import { NextFunction, Response } from 'express';

import { ActionEnum } from '../../constants';
import { IRequestExtended, IUser } from '../../models';
import { tokenizer } from '../../helpers';
import { authService } from '../../services';

class AuthController {
  async authUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;

    const {access_token, refresh_token} = tokenizer(ActionEnum.USER_AUTH);

    const {accessToken, refreshToken} = await authService.createTokenPair({
      accessToken: access_token,
      refreshToken: refresh_token,
      userId: _id
    });

    res.json({accessToken, refreshToken});
  }
}

export const authController = new AuthController();
