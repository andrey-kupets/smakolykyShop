import { Document, Model, model, Schema } from 'mongoose';

import { ICart } from '../../models';
import { CartStatusEnum, TableNamesEnum } from '../../constants';

export type CartType = ICart & Document;

const ProductSubModel = {
  productId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: false
  }
};

export const CartSchema = new Schema<ICart>({// CartSchema: Schema
  products: [ProductSubModel],
  userId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USERS
  },
  status: {
    type: String,
    required: true,
    default: CartStatusEnum.IN_PROGRESS,
    enum: Object.values(CartStatusEnum)
  },
  sum: Number,
  required: true,
  default: 0
}, {
  timestamps: true
});

export const CartModel: Model<CartType> = model<CartType>(TableNamesEnum.CART, CartSchema);
