import * as jwt from 'jsonwebtoken';

import { ActionEnum } from '../constants';
import { ErrorHandler } from '../errors';
import { config } from '../config';

export const tokenizer = (action: ActionEnum): {access_token: string, refresh_token: string} => {
  let access_token = '';
  const refresh_token = '';

  switch (action) {
    case ActionEnum.USER_REGISTER:
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});
      break;

    default:
      throw new ErrorHandler(500, 'Wrong action-type');
  }

  return {
    access_token,
    refresh_token
  };
};