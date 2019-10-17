"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const index_2 = __importDefault(require("./utils/models/index"));
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
//Models
const products_1 = __importDefault(require("./models/products"));
const user_1 = __importDefault(require("./models/user"));
//Test Auth
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(1);
        req.user = user;
        res.locals.user = user;
        console.log(req.user.id);
        next();
    }
    catch (e) {
        console.log(e);
    }
}));
// Get Request URL
app.use((req, res, next) => {
    res.locals.getFullUrl = () => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return next();
});
//ROUTES
app.use('/', index_1.default);
app.use('/users', auth_1.default);
//===========================================================================
//===========================================================================
//===========================================================================
//GET ALL PRODUCTS
app.get('/health', (req, res) => {
    products_1.default.findAll()
        .then((result) => {
        res.send({ products: result });
    })
        .catch((err) => {
        console.log(err);
    });
    // Product.fetchAll()
    //     .then(([rows, fieldData]: any) => {
    //         //rows is the actual data
    //         res.send(rows);
    //     })
    //     .catch((err: any) => console.log(err));
});
//GET ONE PRODUCT
app.get('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        // const product = await Product.findOne({
        //     where: {id}
        // }); Alternative
        const product1 = yield res.locals.user.getProduct();
        const product = yield products_1.default.findByPk(id);
        res.send({ product, product1 });
    }
    catch (e) {
        console.log(e);
        res.send('error');
    }
}));
//UPDATE PRODUCT
app.put('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const updatedTitle = req.body.title;
        // const product = await Product.findOne({
        //     where: {id}
        // }); Alternative
        const product = yield products_1.default.findByPk(id);
        product.title = updatedTitle;
        const result = yield product.save();
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.send('error');
    }
}));
//CREATE PRODUCT
app.post('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        console.log('hello');
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        console.log(res.locals.user);
        // const product =  res.locals.user.createProduct({
        //     title: title,
        //     price: price,
        //     imageUrl: imageUrl,
        //     description: description
        //  }) doesnt work....dont know why yet
        const product = yield products_1.default.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userId: req.user.id
        });
        // const product = new Product(null, title, imageUrl, description, price);
        res.send({ messsage: 'product saved successfu;lly', product });
        // console.log(product);
        // product.save();
    }
    catch (e) {
        console.log(e);
    }
}));
//DELETE PRODUCT
app.delete('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_1.default.findOne({
            where: { title: req.body.title }
        });
        product.destroy();
        res.send({ messsage: 'product destroyed successfu;lly', product });
        // console.log(product);
        // product.save();
    }
    catch (e) {
        console.log(e);
    }
}));
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
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
    res.render('error');
});
products_1.default.belongsTo(user_1.default, { constraints: true, onDelete: 'CASCADE' });
user_1.default.hasMany(products_1.default);
//to override existing tables,we set force to true
index_2.default
    // .sync({force:true})
    .sync()
    .then((res) => {
    console.log('connected successfully');
    return user_1.default.findByPk(1);
})
    .then((user) => {
    console.log(user.id);
    if (!user) {
        user_1.default.create({
            name: 'alpha',
            email: 'test@gmail.com'
        });
    }
    return user;
})
    .then((user) => {
    console.log('user', user.id);
})
    .catch((err) => {
    console.log(err);
});
exports.default = app;
