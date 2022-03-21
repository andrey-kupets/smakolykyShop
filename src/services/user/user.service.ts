import { Types } from 'mongoose';

import { UserModel } from '../../database';
import { IUser, IUserToken } from '../../models';
import { ActionEnum } from '../../constants';

class UserService {
  createUser(user: Partial<IUser>): Promise<IUser> {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  addActionToken(id: string, tokenObject: IUserToken): Promise<IUser> {
    return UserModel.updateOne(
      { _id: Types.ObjectId(id)},
      {
        $push: {
          tokens: tokenObject // as any
        }
      }
    ) as any;
  }

  findOneByParams(findObject: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOne(findObject) as any;
  }

  findUserByActionToken(action: ActionEnum, token: string): Promise<IUser | null> {
    return UserModel.findOne({
      $and: [
        {'tokens.action': action},
        {'tokens.token': token}
      ]
    }) as any;
  }
}

export const userService = new UserService();
