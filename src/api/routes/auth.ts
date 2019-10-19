import express,{Request,Response} from "express";
const router = express.Router();

import models from '../../../models'


/* GET users listing. */
router.get('/', function(req:Request, res:Response) {
  res.send('respond with a resource');
});
// handle sign up logic
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const first_name = req.body.firstname
    const last_name = req.body.lastname
    const password = req.body.password
    const email = req.body.email
    console.log(req.body)
    let user = await models.User.create({
      first_name:first_name,
      last_name:last_name,
      password: password,
      email: email
    })
    res.send(user)
  } catch (e) { 
    res.send({ 'error': e })
  }
})

// handle sign up logic
router.post("/myproducts", async (req: Request, res: Response): Promise<any> => {
  try {
    const userProducts = await models.User.findOne({ where: { id: req.body.id }, include: [{ model: models.Product, as: 'Products' }] })
    console.log(userProducts)
    res.send(userProducts)
  } catch (e) {
    res.send({ 'error': e })
  }
})


// //handle sign in logic
// router.post("/login", authController.logIn)

// //Log out logic
// router.get("/logout", middleware.verifyToken, authController.logOut)

// //Update User
// router.put("/update", middleware.verifyToken, authController.editUser)

// //Edit Password
// router.put("/password", middleware.verifyToken, authController.editPassword)

export default router
