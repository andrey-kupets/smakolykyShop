import * as dayjs from 'dayjs';

import { cartService, productService } from '../services';
import { CartStatusEnum } from '../constants';
import { IProduct } from '../models';

export const clearUnusedCarts = async () => {
  const oldCarts = await cartService.getCartsByParams({
    status: CartStatusEnum.IN_PROGRESS,
    updatedAt: {
      $gte: dayjs(new Date()).subtract(1, 'hour').format()
    } as any
  });

  for (const cart of oldCarts) { // not forEach; only map | for of --- async loops
    for (const product of cart.products) { // not forEach; only map | for of --- async loops
      const productToUpdate = await productService.findProductById(product.productId) as IProduct;
      if (productToUpdate) {
        await productService.updateProductById(product.productId, {stockCount: product.count + productToUpdate.stockCount});
      }
    }

    await cartService.deleteCartById(cart._id);
  }
};
