import { Router } from 'express';
import { authController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkDoesUserExistByEmailMiddleware,
  emailValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post('/',
  emailValidatorMiddleware,
  checkDoesUserExistByEmailMiddleware,
  authController.authUser
);
router.post('/logout',
  checkAccessTokenMiddleware,
  authController.logoutUser
);

export const authRouter = router;
