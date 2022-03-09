import { Router } from 'express';
import HttpExceptions from '../../utils/exceptions/exception.http.js';
import { authLocal } from './service.auth.js';
import { validationRules, validate } from './validation.user.js';
import UserModel from './model.user.js';
import { createToken } from '../../utils/generateToken.js';

class UserController {
  path = '/users';
  router = Router();
  User = UserModel;
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationRules(),
      validate,
      this.register
    );
  }

  register = async (req, res, next) => {
    try {
      const { email, username, password, birthDate } = req.body;
      const user = await this.User.findOne({ email });
      if (user) {
        next(new HttpExceptions(201, 'Email already exists'));
      } else {
        const newUser = await this.User.create({
          email,
          username,
          password,
          birthDate,
        });
        const accessToken = `Bearer ${createToken(newUser)}`;
        res.status(201).json({
          success: true,
          user: { ...newUser._doc, password: undefined },
          token: accessToken,
        });
      }
    } catch (error) {
      console.log(error.stack);
      throw new Error('Something went wrong');
    }
  };
}

export default UserController;
