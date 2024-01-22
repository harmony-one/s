import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// app.use(middleware);
// app.use('/api/someRoute', someRouteHandler);

export default app;