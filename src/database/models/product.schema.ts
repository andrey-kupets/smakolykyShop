import { Document, Model, model, Schema } from 'mongoose';

import { IProduct } from '../../models';
import { TableNamesEnum } from '../../constants';

export type ProductType = IProduct & Document;

export const ProductSchema = new Schema<IProduct>({ // ProductSchema: Schema
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hasDiscount: {
    type: Boolean,
    required: false,
    default: false
  },
  oldPrice: {
    type: Number,
    required: false,
  },
  tags: {
    type: Array,
    required: false
  },
  photo: {
    type: Array,
    required: false
  },
  docs: {
    type: Array,
    required: false
  },
  stockCount: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USERS
  }
}, {timestamps: true});

export const ProductModel: Model<ProductType> = model<ProductType>(TableNamesEnum.PRODUCTS, ProductSchema);
