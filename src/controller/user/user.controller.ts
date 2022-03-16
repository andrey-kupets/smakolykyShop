import { NextFunction, Request, Response } from 'express';

import { userService } from '../../services';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;

      // TODO validate user

      // TODO hash pass
      await userService.createUser(user);

      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
