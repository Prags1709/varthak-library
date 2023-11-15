import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection: Promise<Mongoose> = mongoose.connect("mongodb+srv://pragathees:prags@cluster0.uloohpj.mongodb.net/varthek?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

export { connection };
