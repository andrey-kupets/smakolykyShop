import { Document, Model, model, Schema } from 'mongoose';

import { IAccessToken } from '../../models';
import { TableNamesEnum } from '../../constants';

export type AccessTokenType = IAccessToken & Document;

export const AccessTokenSchema = new Schema<IAccessToken>({ // AccessTokenSchema: Schema
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USERS
  }
}, {
  timestamps: true
});

export const AccessTokenModel: Model<AccessTokenType> = model<AccessTokenType>(TableNamesEnum.ACCESS_TOKENS, AccessTokenSchema);
