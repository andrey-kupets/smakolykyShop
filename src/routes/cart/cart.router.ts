import { Router } from 'express';

import { cartController } from '../../controllers';
import {
  addProductToCartValidationMiddleware,
  checkAccessTokenMiddleware,
  checkDoesProductExistMiddleware,
  checkIsUserConfirmedMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware, checkIsUserConfirmedMiddleware);

router.get('/proceed', cartController.getUserCart);

router.use('/products/:productId', checkDoesProductExistMiddleware);
router.post('/products/:productId',
  addProductToCartValidationMiddleware,
  cartController.addProductToCart
);

export const cartRouter = router;

