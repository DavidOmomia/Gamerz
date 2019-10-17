import express, { Request, Response } from 'express'
const router = express.Router();

import User from '../../models/user'
import Product from '../../models/products'

// //AUTH ROUTES
router.get("/", (req: Request, res: Response) => {

})

// handle sign up logic
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    let user = await User.create({
      username: username,
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
    const userProducts = await User.findAll({ where: { id: req.body.id }, include: [{ model: Product, as: 'Products' }] })
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
