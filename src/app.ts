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
import usersRouter from './api/routes/auth';

//Middlewares
import handleErrors from './api/middlewares/handleErrors';
import db from './utils/models/index';

const app = express();

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


//Models
import Product from './models/products';
import User from './models/user';

//Test Auth
// app.use(async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
//     try {
//         const user = await User.findByPk(1)
//         req.user = user
//         res.locals.user = user
//         console.log(req.user.id)
//         next()
//     } catch (e) {
//         console.log(e)
//     }
// }
// );

// Get Request URL
app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.locals.getFullUrl = (): string => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return next();
});

//ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);




app.use(handleErrors);

// handle 404 errors
app.use((req, res, _next): void => {
    res.status(404).send({
        status: false,
        message: 'resource not found',
        data: null,
        path: req.url
    });
});

// handle unexpected errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);


export default app;









//Normal Sequelize database

// //to override existing tables,we set force to true
// sequelize
//     // .sync({force:true})
//     .sync()
//     .then((res: any) => {
//         console.log('connected successfully');
//         return User.findByPk(1);
//     })
//     .then((user: any) => {
//         console.log(user.id)
//         if (!user) {
//             User.create({
//                 name: 'alpha',
//                 email: 'test@gmail.com'
//             });
//         }
//         return user;
//     })
//     .then((user: any) => {
//         console.log('user', user.id);
//     })
//     .catch((err: any) => {
//         console.log(err);
//     });