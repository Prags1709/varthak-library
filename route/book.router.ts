import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authenticate.middleware';
import { Book, BookModel } from '../model/book.model';

const bookRouter: Router = Router();

// POST /books
bookRouter.post('/', authenticate, async (req: Request, res: Response) => {
    const { user } = req.body;
    const { title, author } = req.body;
    const creatorID: string = user.userID;
    try {
        if (user.role.includes('CREATOR')) {
            const book: Book = new BookModel({ title, author, creatorID });
            await book.save();
            res.status(201).json({ message: 'Book has been created successfully' });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong, Internal server error")
    }
});

// GET /books
bookRouter.get('/', authenticate, async (req: Request, res: Response) => {
    const { user } = req.body;

    try {
        if (!user.role.includes('VIEWER') && !user.role.includes('VIEW_ALL')) {
            res.status(401).send('You are not authorized');
            return;
        }

        let books: Book[] = [];

        if (user.role.includes('VIEW_ALL')) {
            books = await BookModel.find();
        } else if (user.role.includes('VIEWER')) {
            books = await BookModel.find({ creatorID: user.userID });
        }

        // Filter the books
        const tenMinutesAgo: Date = new Date(Date.now() - 10 * 60 * 1000);
        let date = new Date

        if (req.query.old) {
            books = books.filter((book: Book) => date.getTime() - book.createdAt.getTime() >= 600000);
        } else if (req.query.new) {
            books = books.filter((book: Book) => date.getTime() - book.createdAt.getTime() < 600000);
        }

        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong, Internal server error")
    }
});

export { bookRouter };