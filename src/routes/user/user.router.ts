import {Router} from 'express';
import { userController } from '../../controllers';
import {
  checkConfirmTokenMiddleware,
  checkDoesEmailAlreadyExistMiddleware,
  checkDoesUserExistMiddleware, checkForgotPassTokenMiddleware,
  checkIsUserValidMiddleware,
  emailValidatorMiddleware, singlePasswordValidatorMiddleware
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
router.post('/password/reset',
  singlePasswordValidatorMiddleware,
  checkForgotPassTokenMiddleware,
  userController.setForgotPass);

export const userRouter = router;
