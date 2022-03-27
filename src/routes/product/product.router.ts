import {Router} from 'express';
import { productController } from '../../controllers';
import { checkDoesUserExistByEmailMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkDoesUserExistByEmailMiddleware, productController.createProduct);

export const productRouter = router;
