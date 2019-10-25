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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const models_1 = __importDefault(require("../../core/models"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const admin_1 = __importDefault(require("../middlewares/admin"));
// router.use(auth())
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
//GET ALL PRODUCTS
router.get('/health', authenticate_1.default(), admin_1.default(), (req, res) => {
    let client = res.locals.client;
    console.log(client.email);
    models_1.default.Product.findAll()
        .then((result) => {
        res.send({ products: result });
    })
        .catch((err) => {
        console.log(err);
    });
});
//GET ONE PRODUCT
router.post('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const product = yield models_1.default.Product.findOne({
            where: { id }
        });
        if (!product)
            return res.send('product not found');
        res.send(product);
    }
    catch (e) {
        console.log(e);
        res.send('error');
    }
}));
//UPDATE PRODUCT
router.put('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const updatedTitle = req.body.title;
        // const product = await Product.findOne({
        //     where: {id}
        // }); Alternative
        const product = yield models_1.default.Product.findByPk(id);
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
router.post('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        console.log('hello');
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const id = req.body.id;
        console.log(req.body);
        const user = yield models_1.default.User.findByPk(id);
        if (!user) {
            return res.send('user not found');
        }
        const product = yield user.createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        });
        //  await Product.create({
        //     title: title,
        //     price: price,
        //     imageUrl: imageUrl,
        //     description: description,
        //     userId:id
        //   });
        res.send({ messsage: 'product saved successfully', product });
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}));
//DELETE PRODUCT
router.delete('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.default.Product.findOne({
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
exports.default = router;
