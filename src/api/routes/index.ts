import express, { Request, Response } from 'express';
const router = express.Router();

import models from '../../core/models';
import auth from '../middlewares/authenticate';

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
    res.render('index', { title: 'Express' });
});
//GET ALL PRODUCTS
router.get(
    '/health',
    auth(),
    (req: express.Request, res: express.Response): void => {
        models.Product.findAll()
            .then((result: any) => {
                res.send({ products: result });
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
);

//GET ONE PRODUCT
router.post('/health/id', async (req: express.Request, res: express.Response) => {
    try {
        const id = req.body.id;
        const product = await models.Product.findOne({
            where: { id }
        });
        if (!product) return res.send('product not found');
        res.send(product);
    } catch (e) {
        console.log(e);
        res.send('error');
    }
});

//UPDATE PRODUCT
router.put('/health/id', async (req: express.Request, res: express.Response) => {
    try {
        const id = req.body.id;
        const updatedTitle = req.body.title;
        // const product = await Product.findOne({
        //     where: {id}
        // }); Alternative
        const product = await models.Product.findByPk(id);
        product.title = updatedTitle;
        const result = await product.save();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.send('error');
    }
});

//CREATE PRODUCT
router.post('/health', async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    try {
        console.log('hello');
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const id = req.body.id;
        console.log(req.body);
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.send('user not found');
        }
        const product = await user.createProduct({
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
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

//DELETE PRODUCT
router.delete('/health/id', async (req: express.Request, res: express.Response) => {
    try {
        const product = await models.Product.findOne({
            where: { title: req.body.title }
        });
        product.destroy();
        res.send({ messsage: 'product destroyed successfu;lly', product });
        // console.log(product);
        // product.save();
    } catch (e) {
        console.log(e);
    }
});
export default router;
