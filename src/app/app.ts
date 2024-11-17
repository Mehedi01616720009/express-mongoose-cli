import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import router from '../routes';
import notFound from '../middlewares/notFound';
import globalErrorHandler from '../middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import config from '../config';

// initialize express application
const app: Application = express();

// cross origin resources
app.use(cors({ origin: [config.frontendUrl as string], credentials: true }));

// cookie parser
app.use(cookieParser());

// express parser
app.use(express.json());

// initial route
app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Server is running successfully',
        data: null,
    });
});

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// not found api
app.use(notFound);

export default app;
