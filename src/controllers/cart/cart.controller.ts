import { NextFunction, Response } from 'express';

import { IProduct, IRequestExtended, IUser } from '../../models';
import { cartService, productService } from '../../services';
import { customErrors, ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

class CartController {
  async addProductToCart(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id: userId} = req.user as IUser;
      const product = req.product as IProduct;
      const {count} = req.body;

      if (count > product.stockCount) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_LOW_STOCK.message));
      }

      let userCart = await cartService.findUserProceedCart(userId);

      if (!userCart) {
        userCart = await cartService.createCart({userId});
      }

      const updatedCart = await cartService.addProductToCart(userCart, product, count);

      await productService.updateProductById(product._id, {stockCount: product.stockCount - count});

      res.json(updatedCart);
    } catch (e) {
      next(e);
    }
  }

  async getUserCart(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id: userId} = req.user as IUser;
      const userCart = await cartService.findUserProceedCart(userId);

      res.json(userCart);
    } catch (e) {
      next(e);
    }
  }
}

export const cartController = new CartController();
