import {Router} from 'express';
import { userController } from '../../controllers';
import { checkDoesEmailExistMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkDoesEmailExistMiddleware, userController.createUser);
router.post('/confirm', userController.confirmUser);

export const userRouter = router;
