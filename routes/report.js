"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middleware/isAuth");
const report_1 = require("../controller/report");
const router = express_1.default.Router();
router.get('/:reportId?', isAuth_1.isAuthentication, report_1.getReport);
exports.default = router;
