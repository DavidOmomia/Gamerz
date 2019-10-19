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
const validate_js_1 = __importDefault(require("validate.js"));
const check = __importStar(require("../../../services/User"));
const models_1 = __importDefault(require("../../../models"));
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
};
/* GET users listing. */
router.get('/', function (req, res) {
    models_1.default.User.findAll().then((users) => {
        res.send(users);
    });
});
// handle sign up logic
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const first_name = req.body.firstname;
        const last_name = req.body.lastname;
        const password = req.body.password;
        const email = req.body.email;
        const validation = validate_js_1.default({ first_name, last_name, password, email }, constraints);
        if (validation) {
            return res.status(400).send({ errorV: validation });
        }
        const result = yield check.checkEmail(req.body.email);
        console.log(result);
        if (result) {
            return res.status(400).send({ error: 'email already taken', user: result });
        }
        const args = { first_name, last_name, password, email };
        const user = yield check.createUser(args);
        res.status(200).send(user);
    }
    catch (e) {
        res.status(401).send({ 'error': e });
    }
}));
// handle sign up logic
router.post("/myproducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProducts = yield models_1.default.User.findOne({ where: { id: req.body.id }, include: [{ model: models_1.default.Product, as: 'Products' }] });
        console.log(userProducts);
        res.status(200).send(userProducts);
    }
    catch (e) {
        res.send({ 'error': e });
    }
}));
router.post("/signIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const result = yield check.checkEmail(email);
        if (!result) {
            res.status(401).send({ error: 'User not found' });
        }
        res.status(200).send(result);
    }
    catch (e) {
        console.log(e);
    }
}));
// //handle sign in logic
// router.post("/login", authController.logIn)
// //Log out logic
// router.get("/logout", middleware.verifyToken, authController.logOut)
// //Update User
// router.put("/update", middleware.verifyToken, authController.editUser)
// //Edit Password
// router.put("/password", middleware.verifyToken, authController.editPassword)
exports.default = router;
