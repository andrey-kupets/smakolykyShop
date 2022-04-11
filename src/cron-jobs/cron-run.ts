import * as cron from 'node-cron';

import { clearUnusedCarts } from './clear-unused-carts';

export const cronJobRun = () => { // TODO
  cron.schedule('* * * * *', async () => {
    await clearUnusedCarts();
  });
};
