import express, { Request, Response, Router } from 'express';
import { UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const user_route: Router = express.Router();

user_route.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, secure_password) => {
      if (err) {
        console.log(err);
        res.status(500).send('something went wrong');
      } else {
        const user = new UserModel({ name, email, password: secure_password, role });
        await user.save();
        res.status(201).send('Signup success');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('error in registering the user');
  }
});

user_route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.send('please sign up first');
    } else {
      const hash_password = user?.password;
      bcrypt.compare(password, hash_password, (err, result) => {
        if (result) {
          //Normal Token
          const normal_token = jwt.sign(
            { userID: user._id, role: user.role },
            'N_token',
            { expiresIn: '3600s' }
          );
          //Refresh Token
          const refresh_token = jwt.sign(
            { userID: user._id, role: user.role },
            'R_token',
            { expiresIn: '33500s' }
          );
          res.status(201).send({ msg: 'login success', normal_token, refresh_token });
        } else {
          res.status(400).send('something went wrong, Pleace try again');
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('error in login the user');
  }
});

export { user_route };
