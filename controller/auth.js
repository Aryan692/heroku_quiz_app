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
exports.isEmailExist = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../helper/error"));
const express_validator_1 = require("express-validator");
// const registerUser = async(req:Request ,res:Response , next:NextFunction) =>{
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        const validationError = (0, express_validator_1.validationResult)(req);
        if (!validationError.isEmpty()) {
            const err = new error_1.default("validation failed");
            err.statusCode = 422;
            err.data = validationError.array();
            throw err;
        }
        const name = req.body.name;
        const email = req.body.email;
        const password = (req.body.password);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_1.default({ name, email, password: hashedPassword });
        const result = yield user.save();
        console.log(user);
        if (!result) {
            resp = { status: "error", message: "No user found", data: {} };
            res.status(401).send(resp);
        }
        else {
            resp = { status: "success", message: "resgistration done", data: { userId: result._id } };
            res.send(resp);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            const err = new error_1.default("user not found");
            err.statusCode = 401;
            throw err;
        }
        const status = yield bcryptjs_1.default.compare(password, user.password);
        if (status) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, "secretMysecretKey", { expiresIn: "1h" });
            resp = { status: "success", message: "Login successful", data: { token } };
            res.send(resp);
        }
        else {
            const err = new error_1.default("invalid cridentials");
            err.statusCode = 401;
            throw err;
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const isEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return false;
    }
    return true;
});
exports.isEmailExist = isEmailExist;
