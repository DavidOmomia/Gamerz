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
const user_1 = __importDefault(require("../../models/user"));
const products_1 = __importDefault(require("../../models/products"));
// //AUTH ROUTES
router.get("/", (req, res) => {
});
// handle sign up logic
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        let user = yield user_1.default.create({
            username: username,
            password: password,
            email: email
        });
        res.send(user);
    }
    catch (e) {
        res.send({ 'error': e });
    }
}));
// handle sign up logic
router.post("/myproducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProducts = yield user_1.default.findAll({ where: { id: req.body.id }, include: [{ model: products_1.default, as: 'Products' }] });
    }
    catch (e) {
        res.send({ 'error': e });
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
