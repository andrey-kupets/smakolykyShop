import {Document, Model, model, Schema} from 'mongoose';

import { IUser } from '../../models';
import { UserRoleEnum, UserStatusEnum } from '../../constants';

export type UserType = IUser & Document;

const tokenSubModel = {
  token: String,
  action: String
};

export const UserSchema = new Schema<IUser>({ // UserSchema: Schema
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: UserRoleEnum.USER
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: UserStatusEnum.PENDING
  },
  tokens: [tokenSubModel],
  createdAt: {
    type: Date as any, // TODO fix incompatible types
    default: Date.now() as any
  }
});

export const UserModel: Model<any> = model<UserType>('users', UserSchema);
