"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_1 = require("../controller/quiz");
const isAuth_1 = require("../middleware/isAuth");
const express_validator_1 = require("express-validator");
const route = express_1.default.Router();
//create
route.post('/', isAuth_1.isAuthentication, [
    (0, express_validator_1.body)('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("please enter a valid name, name should be min 10 character"),
    (0, express_validator_1.body)('questions_list')
        .custom(question_list => {
        if (question_list.length === 0) {
            return Promise.reject("atleast should be one question ");
        }
        return true;
    }),
    (0, express_validator_1.body)('answer')
        .custom(answer => {
        if (Object.keys(answer).length === 0) {
            return Promise.reject("answer should not be empty");
        }
        return true;
    })
], quiz_1.createQuiz);
//get quiz
route.get('/:quizId', isAuth_1.isAuthentication, quiz_1.getQuiz);
//updated quiz
route.put('/', isAuth_1.isAuthentication, [
    (0, express_validator_1.body)('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("please enter a valid name, name should be min 10 character"),
    (0, express_validator_1.body)('questions_list')
        .custom(question_list => {
        if (question_list.length === 0) {
            return Promise.reject("atleast should be one question ");
        }
        return true;
    }),
    (0, express_validator_1.body)('answer')
        .custom(answer => {
        if (Object.keys(answer).length === 0) {
            return Promise.reject("answer should not be empty");
        }
        return true;
    })
], quiz_1.updateQuiz);
//deleted quiz
route.post('/:quizId', isAuth_1.isAuthentication, quiz_1.deleteQuiz);
route.patch('/publish', isAuth_1.isAuthentication, quiz_1.publishQuiz);
exports.default = route;
