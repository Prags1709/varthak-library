import { Document, Schema, model } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  creatorID: string;
  createdAt: Date;
}

const bookSchema: Schema<Book> = new Schema<Book>(
  {
    title: String,
    author: String,
    creatorID: String,
  },
  { timestamps: { createdAt: true } }
);

const BookModel = model<Book>('book', bookSchema)

export {Book, BookModel};
