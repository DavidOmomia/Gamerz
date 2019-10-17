import express,{Request,Response} from "express";
const router = express.Router();
import Product from '../../models/products';

/* GET home page. */
router.get("/", (req:Request, res:Response)=> {
  res.render("index", { title: "Express" });
});


//GET ALL PRODUCTS
router.get('/health', (req: express.Request, res: express.Response): void => {
  Product.findAll()
      .then((result: any) => {
          res.send({ products: result });
      })
      .catch((err: any) => {
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
router.get('/health/id', async (req: express.Request, res: express.Response) => {
  try {
      const id = req.body.id;
      // const product = await Product.findOne({
      //     where: {id}
      // }); Alternative
      const product1= await res.locals.user.getProduct()
      const product = await Product.findByPk(id);
      res.send({product,product1});
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
      const product = await Product.findByPk(id);
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
      console.log(res.locals.user)
      // const product =  res.locals.user.createProduct({
      //     title: title,
      //     price: price,
      //     imageUrl: imageUrl,
      //     description: description
      //  }) doesnt work....dont know why yet
      const product = await Product.create({
          title: title,
          price: price,
          imageUrl: imageUrl,
          description: description,
          userId:req.body.id
      });
         // const product = new Product(null, title, imageUrl, description, price); 
      res.send({ messsage: 'product saved successfu;lly', product });
      // console.log(product);
      // product.save();
  } catch (e) {
      console.log(e);
  }
});

//DELETE PRODUCT
router.delete('/health/id', async (req: express.Request, res: express.Response) => {
  try {
      const product = await Product.findOne({
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

//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================

export default router;
