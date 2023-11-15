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
exports.user_route = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../model/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_route = express_1.default.Router();
exports.user_route = user_route;
user_route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        bcrypt_1.default.hash(password, 4, (err, secure_password) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                res.status(500).send('something went wrong');
            }
            else {
                const user = new user_model_1.UserModel({ name, email, password: secure_password, role });
                yield user.save();
                res.status(201).send('Signup success');
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error in registering the user');
    }
}));
user_route.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user) {
            res.send('please sign up first');
        }
        else {
            const hash_password = user === null || user === void 0 ? void 0 : user.password;
            bcrypt_1.default.compare(password, hash_password, (err, result) => {
                if (result) {
                    //Normal Token
                    const normal_token = jsonwebtoken_1.default.sign({ userID: user._id, role: user.role }, 'N_token', { expiresIn: '3600s' });
                    //Refresh Token
                    const refresh_token = jsonwebtoken_1.default.sign({ userID: user._id, role: user.role }, 'R_token', { expiresIn: '33500s' });
                    res.status(201).send({ msg: 'login success', normal_token, refresh_token });
                }
                else {
                    res.status(400).send('something went wrong, Pleace try again');
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error in login the user');
    }
}));
