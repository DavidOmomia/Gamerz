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
const products_1 = __importDefault(require("../../models/products"));
/* GET home page. */
router.get("/", (req, res) => {
    res.render("index", { title: "Express" });
});
//GET ALL PRODUCTS
router.get('/health', (req, res) => {
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
router.get('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.put('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            userId: req.body.id
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
router.delete('/health/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
