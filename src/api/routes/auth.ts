import express, { Request, Response } from 'express';
const router = express.Router();

import auth from '../middlewares/authenticate';

import db from '../../core/models';
import * as userController from '../contollers/auth';

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

//Get logged in user
router.get('/user', auth(), userController.getUser);

//Update User
router.post('/user/update', auth(), userController.updateUser);

//Edit Password
router.post('/user/resetpassword', auth(), userController.passwordReset);

router.post(
    '/user/myproducts',
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

//========================================================================================================
//==REFRESH TOKEN EXPERIMENT
//========================================================================================================

router.post('/refresh/login', userController.logIn);

router.post('/user/token', auth(), userController.getToken);

export default router;
