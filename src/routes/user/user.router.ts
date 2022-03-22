import {Router} from 'express';
import { userController } from '../../controllers';
import { checkConfirmTokenMiddleware, checkDoesEmailExistMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkDoesEmailExistMiddleware, userController.createUser);
router.post('/confirm', checkConfirmTokenMiddleware, userController.confirmUser);

export const userRouter = router;
