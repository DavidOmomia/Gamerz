import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';

import indexRouter from './api/routes/index';
import auth from './api/routes/auth';

//Middlewares
import handleErrors from './api/middlewares/handleErrors';
const app = express();

//For emitters events
require('./core/events/index').init();

// Resolve CORS
app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(compression());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Get Request URL
app.use(
    (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        res.locals.getFullUrl = (): string => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        return next();
    }
);

//ROUTES
app.use('/', indexRouter);
app.use('/', auth);
app.use(handleErrors);

// handle 404 errors
app.use(
    (req, res, _next): void => {
        res.status(404).send({
            status: false,
            message: 'resource not found',
            data: null,
            path: req.url
        });
    }
);

// handle unexpected errors
app.use(
    (err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.send(err);
    }
);

export default app;
