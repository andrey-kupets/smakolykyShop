import {Router} from 'express';
import { userController } from '../../controllers';
import {
  checkConfirmTokenMiddleware,
  checkDoesEmailAlreadyExistMiddleware,
  checkDoesUserExistMiddleware,
  checkIsUserValidMiddleware,
  emailValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post('/',
  checkIsUserValidMiddleware,
  checkDoesEmailAlreadyExistMiddleware,
  userController.createUser);
router.post('/confirm',
  checkConfirmTokenMiddleware,
  userController.confirmUser);
router.post('/password/forgot',
  emailValidatorMiddleware,
  checkDoesUserExistMiddleware,
  userController.forgotPassword);

export const userRouter = router;
