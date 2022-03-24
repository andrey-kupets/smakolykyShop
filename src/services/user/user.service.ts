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
      {_id: Types.ObjectId(id)},
      {
        $push: {
          tokens: tokenObject
        }
      }
    ) as any;
  }

  findOneByParams(findObject: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOne(findObject) as any;
  }

  updateUserByParams(params: Partial<IUser>, update: Partial<IUser>): Promise<IUser> {
    return UserModel.updateOne(params, update, {new: true}) as any;
  }

  findUserByActionToken(action: ActionEnum, token: string): Promise<IUser | null> {
    return UserModel.findOne({
      $and: [
        {'tokens.action': action},
        {'tokens.token': token}
      ]
    }) as any;
  }

  // removeActionToken(token: string, index: number): Promise<IUser | null> { // by mongo $unset
  //   const elementToDelete = `tokens.${index}`;
  //
  //   return UserModel.updateOne(
  //     {'tokens.token': token},
  //     // {$unset: {[tokenToDelete]: ''}} // remove 'token'-field from array only
  //     {$unset: {[elementToDelete]: ''}} // remove whole element of array but leave null
  //   ) as any;
  // }

  removeActionToken(token: string): Promise<IUser | null> { // by mongo $pull
    return UserModel.updateOne(
      {'tokens.token': token },
      {$pull: {tokens: {token}}}
    ) as any;
  }
}

export const userService = new UserService();
