import {Document, Model, model, Schema} from 'mongoose';

import { IProduct } from '../../models';
import { TableNamesEnum } from '../../constants';

export type ProductType = IProduct & Document;

export const ProductSchema = new Schema<IProduct>({ // ProductSchema: Schema
//
}, {timestamps: true});

export const ProductModel: Model<ProductType> = model<ProductType>(TableNamesEnum.LOGS, ProductSchema);
