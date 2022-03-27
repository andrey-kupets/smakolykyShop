import {Router} from 'express';
import { authController } from '../../controllers';
import { checkDoesUserExistByEmailMiddleware, emailValidatorMiddleware } from '../../middlewares';

const router = Router();

router.post('/',
  emailValidatorMiddleware,
  checkDoesUserExistByEmailMiddleware,
  authController.authUser
);

export const authRouter = router;
