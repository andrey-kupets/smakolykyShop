import { Request } from 'express';

import { IProduct, IUser } from '../models';

export interface IRequestExtended extends Request {
  user?: IUser
  product?: IProduct
}
