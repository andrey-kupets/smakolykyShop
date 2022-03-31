import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../models';
import { ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { authService } from '../../services';
import { tokenVerificator } from '../../helpers';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!accessToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
    }

    await tokenVerificator(ActionEnum.USER_AUTH, accessToken);

    const userByToken = await authService.findUserByToken({accessToken});

    if (!userByToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
    }

    req.user = userByToken;

    next();
  } catch (e) {
    next(e);
  }
};
