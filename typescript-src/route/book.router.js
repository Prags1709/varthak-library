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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const authenticate_middleware_1 = require("../middleware/authenticate.middleware");
const book_model_1 = require("../model/book.model");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
// POST /books
bookRouter.post('/', authenticate_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const { title, author } = req.body;
    const creatorID = user.userID;
    try {
        if (user.role.includes('CREATOR')) {
            const book = new book_model_1.BookModel({ title, author, creatorID });
            yield book.save();
            res.status(201).json({ message: 'Book has been created successfully' });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("something went wrong, Internal server error");
    }
}));
// GET /books
bookRouter.get('/', authenticate_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        if (!user.role.includes('VIEWER') && !user.role.includes('VIEW_ALL')) {
            res.status(401).send('You are not authorized');
            return;
        }
        let books = [];
        if (user.role.includes('VIEW_ALL')) {
            books = yield book_model_1.BookModel.find();
        }
        else if (user.role.includes('VIEWER')) {
            books = yield book_model_1.BookModel.find({ creatorID: user.userID });
        }
        // Filter the books
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        let date = new Date;
        if (req.query.old) {
            books = books.filter((book) => date.getTime() - book.createdAt.getTime() >= 600000);
        }
        else if (req.query.new) {
            books = books.filter((book) => date.getTime() - book.createdAt.getTime() < 600000);
        }
        res.status(200).send(books);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("something went wrong, Internal server error");
    }
}));
