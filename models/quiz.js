"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const quizSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questions_list: [
        {
            question_number: Number,
            question: String,
            options: {}
        }
    ],
    answer: {},
    created_by: {
        type: mongoose_1.default.Types.ObjectId,
    },
    is_published: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const Quiz = mongoose_1.default.model("Quiz", quizSchema);
exports.default = Quiz;
