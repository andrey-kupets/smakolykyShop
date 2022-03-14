import * as http from 'http';

import { app } from './app';

const server = http.createServer(app);

server.listen(5000, () => {
  console.log(`Port 5000 is being listened`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('uncaughtException', error => {
  console.log(error);
});

process.on('unhandledRejection', error => {
  console.log(error);
});
