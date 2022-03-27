import { AccessTokenModel } from '../../database';
import { IAccessToken } from '../../models';

class AuthService {
  createTokenPair(tokenObject: Partial<IAccessToken>): Promise<IAccessToken> {
    const tokensToCreate = new AccessTokenModel(tokenObject);

    return tokensToCreate.save();
  }

  findUserByToken(findObject: {access_token?: string, refresh_token?: string}): Promise<IAccessToken | null> {
    return AccessTokenModel.findOne(findObject) as any;
  }
}

export const authService = new AuthService();
