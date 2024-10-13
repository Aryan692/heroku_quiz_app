"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/', [
    (0, express_validator_1.body)('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4 })
        .withMessage("please enter a valid name, name should be min 4 character"),
    (0, express_validator_1.body)('email')
        .trim()
        .isEmail()
        .custom((emailId) => {
        return (0, auth_1.isEmailExist)(emailId)
            .then((status) => {
            if (status) {
                return Promise.reject("user already exist!");
            }
        })
            .catch(err => {
            return Promise.reject(err);
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage("please enter a valid password"),
    (0, express_validator_1.body)('confirm_password')
        .trim()
        .custom((value, { req }) => {
        if (value != req.body.password) {
            return Promise.reject("Password mismatch");
        }
        return true;
    })
], auth_1.registerUser);
router.post('/login', auth_1.loginUser);
exports.default = router;
