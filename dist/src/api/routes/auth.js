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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const models_1 = __importDefault(require("../../core/models"));
const userController = __importStar(require("../contollers/auth"));
/* GET users listing. */
router.get('/alluser', function (req, res) {
    models_1.default.User.findAll().then((users) => {
        res.send(users);
    });
});
// handle sign up logic
router.post('/register', userController.createUser);
// handle sign in logic
router.post('/login', userController.logIn);
//Get logged in user
router.get('/user', authenticate_1.default(), userController.getUser);
//Update User
router.post('/user/update', authenticate_1.default(), userController.updateUser);
//Edit Password
router.post('/user/resetpassword', authenticate_1.default(), userController.passwordReset);
router.post('/user/myproducts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProducts = yield models_1.default.User.findOne({ where: { id: req.body.id }, include: [{ model: models_1.default.Product, as: 'Products' }] });
        console.log(userProducts);
        res.status(200).send(userProducts);
    }
    catch (e) {
        res.send({ error: e });
    }
}));
//========================================================================================================
//==REFRESH TOKEN EXPERIMENT
//========================================================================================================
router.post('/refresh/login', userController.logIn);
router.post('/user/token', authenticate_1.default(), userController.getToken);
exports.default = router;
