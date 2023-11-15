import express, { Express } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connection } from './config/db';
import { user_route } from './route/user.router';
import { bookRouter } from './route/book.router';
import { authenticate } from './middleware/authenticate.middleware';

const app: Express = express();
dotenv.config();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('HELLO VARTHAK');
});

app.use(express.json());
app.use(cors());
app.use('/user', user_route);
app.use(authenticate)
app.use('/books', bookRouter);

const port: number = Number(process.env.PORT) || 4500;

app.listen(port, async () => {
  try {
    await connection;
    console.log('DB connected');
  } catch (error) {
    console.log(error);
    console.log('DB does not connected');
  }
  console.log(`App listening on PORT ${port}`);
});
 