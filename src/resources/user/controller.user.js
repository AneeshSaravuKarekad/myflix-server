import { Router } from 'express';
import HttpExceptions from '../../utils/exceptions/exception.http.js';
import { authLocal, authJwt } from './service.auth.js';
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

    this.router.get(`${this.path}/profile`, authJwt, this.getProfile);

    this.router.post(`${this.path}/profile`, authJwt, this.updateProfile);

    this.router.get(`${this.path}/favourites`, authJwt, this.getFavourites);

    this.router.put(`${this.path}/favourites`, authJwt, this.addToFavourites);

    this.router.delete(
      `${this.path}/favourites/:movieId`,
      authJwt,
      this.removeFromFavourites
    );
  }

  register = async (req, res, next) => {
    try {
      const { email, username, password, birthDate } = req.body;
      const user = await this.User.findOne({ email });
      if (user) {
        next(new HttpExceptions(400, 'Email already exists'));
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

  getProfile = async (req, res, next) => {
    try {
      if (!req.user) {
        console.log(req);
        res.status(400).json({
          success: false,
          message: 'User not found',
        });
      } else {
        res.status(200).json({
          success: true,
          user: req.user,
        });
      }
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      let user = await this.User.findById(req.user._id);
      const { email, username, password, birthDate } = req.body;
      user.username = username;
      user.email = email;
      user.password = password;
      user.birthDate = birthDate;
      user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };

  getFavourites = async (req, res, next) => {
    try {
      const user = await this.User.findById(req.user._id).populate(
        'favourites'
      );
      res.status(200).json({
        success: true,
        favourites: user.favourites,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addToFavourites = async (req, res, next) => {
    try {
      const { movieId } = req.body;
      const user = await this.User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $addToSet: { favourites: movieId },
        },
        { new: true }
      ).populate('favourites');

      res.status(201).json({
        success: true,
        favourites: user.favourites,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  removeFromFavourites = async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const user = await this.User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { favourites: movieId },
        },
        { new: true }
      ).populate('favourites');

      res.status(200).json({
        success: true,
        favourites: user.favourites,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default UserController;
