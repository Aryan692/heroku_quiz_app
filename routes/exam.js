"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exam_1 = require("../controller/exam");
const isAuth_1 = require("../middleware/isAuth");
const route = express_1.default.Router();
route.get('/:quizId', isAuth_1.isAuthentication, exam_1.Exam);
route.get('/', isAuth_1.isAuthentication, exam_1.submitExam);
exports.default = route;
