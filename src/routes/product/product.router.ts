import {Router} from 'express';
import { productController } from '../../controllers';
import { checkAccessTokenMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkAccessTokenMiddleware, productController.createProduct);

export const productRouter = router;
