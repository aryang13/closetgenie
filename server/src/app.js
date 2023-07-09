// General imports
import express from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: "json" };

// Router imports
import clothingRouter from './routes/clothingRouter.js';
import outfitRouter from './routes/outfitRouter.js';
import laundryRouter from './routes/laundryRouter.js';
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRouter.js';

import { checkIfAuthenticated } from './middleware/auth.js';

// App setup
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: '15mb'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/clothing', checkIfAuthenticated, clothingRouter);
app.use('/outfit', checkIfAuthenticated, outfitRouter);
app.use('/laundry', checkIfAuthenticated, laundryRouter);
app.use('/user', userRouter);
app.use('/image', checkIfAuthenticated, imageRouter);

// Ping route
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

export default app;