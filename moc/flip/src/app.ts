import express from 'express';
import cors from 'cors';

const dotenv = require('dotenv');
let envFile = '.env';
if (process.env.NODE_ENV === 'development') {
  envFile = '.env.dev';
}
console.log('Loading:', envFile);
dotenv.config({ path: envFile });

const app = express();
app.use(cors());
app.use(express.json());

// app.use(middleware);
// app.use('/api/someRoute', someRouteHandler);

export default app;