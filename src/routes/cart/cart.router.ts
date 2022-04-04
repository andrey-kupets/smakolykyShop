import { Router } from 'express';

import { cartController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkDoesProductExistMiddleware,
  checkIsUserConfirmedMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware, checkIsUserConfirmedMiddleware);
router.use('/products/:productId', checkDoesProductExistMiddleware);
router.post('/products/:productId',
  cartController.addProductToCart
);

export const cartRouter = router;

