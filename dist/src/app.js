"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const index_1 = __importDefault(require("./api/routes/index"));
const auth_1 = __importDefault(require("./api/routes/auth"));
//Middlewares
const handleErrors_1 = __importDefault(require("./api/middlewares/handleErrors"));
const app = express_1.default();
// Resolve CORS
app.use(cors_1.default());
app.options('*', cors_1.default());
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(compression_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Get Request URL
app.use((req, res, next) => {
    res.locals.getFullUrl = () => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return next();
});
//ROUTES
app.use('/', index_1.default);
app.use('/', auth_1.default);
app.use(handleErrors_1.default);
// handle 404 errors
app.use((req, res, _next) => {
    res.status(404).send({
        status: false,
        message: 'resource not found',
        data: null,
        path: req.url
    });
});
// handle unexpected errors
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});
exports.default = app;
