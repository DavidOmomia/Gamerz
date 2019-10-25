import express, { Request, Response } from 'express';
const router = express.Router();

import auth from '../middlewares/authenticate';

import db from '../../core/models';
import * as userController from '../contollers/auth';

/*
@body
-first_name:string
-last_name:string
-username:string
-password:string
-email:string
*/

/* GET users listing. */
router.get('/alluser', function (req: Request, res: Response) {
    db.User.findAll().then((users: any) => {
        res.send(users);
    });
});
// handle sign up logic
router.post('/register', userController.createUser);

// handle sign in logic
router.post('/login', userController.logIn);

//Update User
router.post('/update', auth(), userController.updateUser);

// //Edit Password
router.post('/resetpassword', auth(), userController.passwordReset);

router.post(
    '/myproducts',
    async (req: Request, res: Response): Promise<any> => {
        try {
            const userProducts = await db.User.findOne({ where: { id: req.body.id }, include: [{ model: db.Product, as: 'Products' }] });
            console.log(userProducts);
            res.status(200).send(userProducts);
        } catch (e) {
            res.send({ error: e });
        }
    }
);
export default router;
