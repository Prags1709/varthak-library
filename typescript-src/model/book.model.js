"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    creatorID: String,
}, { timestamps: { createdAt: true } });
const BookModel = (0, mongoose_1.model)('book', bookSchema);
exports.BookModel = BookModel;
