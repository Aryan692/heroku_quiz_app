"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../helper/error"));
const isAuthentication = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            const err = new error_1.default("not authenticated");
            err.statusCode = 401;
            throw err;
        }
        const token = authHeader.split(" ")[1];
        // console.log(token);
        let decodedToken;
        // key -->   "secretMysecretKey"
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, "secretMysecretKey");
            //   console.log(decodedToken);
        }
        catch (error) {
            const err = new error_1.default("not authenticated");
            err.statusCode = 401;
            throw err;
        }
        if (!decodedToken) {
            const err = new error_1.default("not authenticated");
            err.statusCode = 401;
            throw err;
        }
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isAuthentication = isAuthentication;
