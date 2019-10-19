import express, { Request, Response } from "express";
const router = express.Router();

import validate from 'validate.js'
import * as check from '../../../services/User'
import db from '../../../models'


/*
@body
-first_name:string
-last_name:string
-username:string
-password:string
-email:string
*/

const constraints = {
  first_name: {
    presence: true,
    length: { maximum: 50 }
  },
  last_name: {
    presence: true,
    length: { maximum: 50 }
  },
  password: {
    presence: true,
    length: { minimum: 5, maximum: 20 }
  },
  email: {
    presence: true,
    email: true
  }
}

/* GET users listing. */
router.get('/', function (req: Request, res: Response) {
  db.User.findAll().then((users:any)=>{
   res.send(users)
  })
});
// handle sign up logic
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const first_name = req.body.firstname
    const last_name = req.body.lastname
    const password = req.body.password
    const email = req.body.email
    const validation = validate({ first_name, last_name, password, email }, constraints)
    if (validation) { return res.status(400).send({ errorV: validation }) }
    const result = await check.checkEmail(req.body.email)
    console.log(result)
    if (result) {
      return res.status(400).send({error:'email already taken',user:result})
    }
    const args={first_name,last_name,password,email}
    const user = await check.createUser(args)
    res.status(200).send(user)
  } catch (e) {
    res.status(401).send({ 'error': e })
  }
})

// handle sign up logic
router.post("/myproducts", async (req: Request, res: Response): Promise<any> => {
  try {
    const userProducts = await db.User.findOne({ where: { id: req.body.id }, include: [{ model: db.Product, as: 'Products' }] })
    console.log(userProducts)
    res.status(200).send(userProducts)
  } catch (e) {
    res.send({ 'error': e })
  }
})

router.post("/signIn", async (req: Request, res: Response): Promise<any> => {
  try {
    const password = req.body.password
    const email = req.body.email
    const result = await check.checkEmail(email)
    if(!result){
      res.status(401).send({error:'User not found'})
    }
    res.status(200).send(result)
  } catch (e) {
    console.log(e)
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
