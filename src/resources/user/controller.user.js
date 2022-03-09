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

    this.router.post(`${this.path}/login`, authLocal, this.login);
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
      throw new Error(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const accessToken = `Bearer ${createToken(req.user)}`;
      res.status(200).json({
        success: true,
        user: { ...req.user._doc, password: undefined },
        token: accessToken,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default UserController;
