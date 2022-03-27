import { AccessTokenModel } from '../../database';
import { IAccessToken } from '../../models';

class AuthService {
  createTokenPair(tokenObject: Partial<IAccessToken>) {
    const tokensToCreate = new AccessTokenModel(tokenObject);

    return tokensToCreate.save();
  }

  findUserByToken(findObject: {accessToken?: string, refreshToken?: string}) {
    return AccessTokenModel.findOne(findObject);
  }
}

export const authService = new AuthService();
