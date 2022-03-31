import { Router } from 'express';
import { authController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkDoesUserExistByEmailMiddleware,
  checkIsUserConfirmedMiddleware,
  emailPasswordValidationMiddleware
} from '../../middlewares';

const router = Router();

router.post('/',
  emailPasswordValidationMiddleware,
  checkDoesUserExistByEmailMiddleware,
  checkIsUserConfirmedMiddleware,
  authController.authUser
);
router.post('/logout',
  checkAccessTokenMiddleware,
  authController.logoutUser
);

export const authRouter = router;
