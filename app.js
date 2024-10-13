"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const exam_1 = __importDefault(require("./routes/exam"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const connectionString = "mongodb+srv://at251759:Aryan@123@cluster0.qaxcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectionString = "mongodb+srv://at251759:JYyODrT6hIZZKm3q@cluster0.qaxcr.mongodb.net/";
app.get('/', function (req, res) {
    res.send("hello world");
});
app.use('/user', user_1.default);
app.use('/auth', auth_1.default);
app.use('/quiz', quiz_1.default);
app.use('/exam', exam_1.default);
app.use((err, req, res, next) => {
    let message;
    let statusCode;
    let data;
    if (!!err.statusCode && err.statusCode < 500) {
        message = err.message;
        statusCode = err.statusCode;
    }
    else {
        message = "something went wrong try again later";
        statusCode = 500;
    }
    let resp = { status: "error", message, data: {} };
    if (!!err.data) {
        resp.data = err.data;
    }
    console.log(err.message, err.statusCode);
    res.status(statusCode).send(resp);
});
mongoose_1.default.connect(connectionString)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server connected on port 3000");
    });
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
});
// app.listen(3000 , ()=>{
//     console.log("server connected")
// });
