import { NextFunction, Request, Response } from 'express';

import * as cors from 'cors';
import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as swaggerUI from 'swagger-ui-express';

import { config } from './config';
import {
  authRouter,
  cartRouter,
  productRouter,
  userRouter
} from './routes';
import { ResponseStatusCodesEnum } from './constants';
import * as swaggerDoc from './docs/swagger.json';

dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests
});

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');

    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(serverRequestLimit);
    this.app.use(cors({
      origin: this.configureCors
    }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    this.app.use(express.static(path.join((global as any).appRoot, 'public')));

    this.mountRoutes();
    this.setupDB();

    this.app.use(this.customErrorHandler);
  }

  private setupDB(): void {
    mongoose.connect(config.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    );

    const db = mongoose.connection;
    db.on('error', console.log.bind(console, 'MONGO ERROR'));
  }

  private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    res
      .status(err.status || ResponseStatusCodesEnum.SERVER)
      .json({
        message: err.message || 'Unknown error',
        code: err.code
      });
  }

  private configureCors = (origin: any, callback: Function) => {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!origin) { // for postman
      return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
      return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
  };

  private mountRoutes(): void {
    // this.app.use('/admin', adminRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/cart', cartRouter);
    this.app.use('/products', productRouter);
    this.app.use('/users', userRouter);

    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  }
}

export const app = new App().app;
