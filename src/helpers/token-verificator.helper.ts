import { verify, VerifyCallback } from 'jsonwebtoken';

import {promisify} from 'util';
import { ActionEnum, ResponseStatusCodesEnum } from '../constants';
import { ErrorHandler } from '../errors';
import { config } from '../config';

const verifyPromise = promisify(verify);

export const tokenVerificator = async (action: ActionEnum, token: string): Promise<VerifyCallback> => {
  let isValid;

  switch (action) {
    case ActionEnum.USER_AUTH:
      isValid = await verifyPromise(token, config.JWT_CONFIRM_EMAIL_SECRET) as Promise<VerifyCallback>;
      break;

    case ActionEnum.USER_REGISTER:
      isValid = await verifyPromise(token, config.JWT_CONFIRM_EMAIL_SECRET) as Promise<VerifyCallback>;
      break;

    case ActionEnum.FORGOT_PASSWORD:
      isValid = await verifyPromise(token, config.JWT_PASS_RESET_SECRET) as Promise<VerifyCallback>;
      break;

    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrong action-type');
  }

  return isValid;
};
