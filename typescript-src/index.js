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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const user_router_1 = require("./route/user.router");
const book_router_1 = require("./route/book.router");
const authenticate_middleware_1 = require("./middleware/authenticate.middleware");
const app = (0, express_1.default)();
dotenv_1.default.config();
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
app.get('/', (req, res) => {
    res.send('HELLO VARTHAK');
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/user', user_router_1.user_route);
app.use(authenticate_middleware_1.authenticate);
app.use('/books', book_router_1.bookRouter);
const port = Number(process.env.PORT) || 4500;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.connection;
        console.log('DB connected');
    }
    catch (error) {
        console.log(error);
        console.log('DB does not connected');
    }
    console.log(`App listening on PORT ${port}`);
}));
