import { Router } from 'express';
import GenreModel from './model.genres.js';
import { authJwt } from '../user/service.auth.js';
import HttpExceptions from '../../utils/exceptions/exception.http.js';
import GenreServices from './services.genres.js';

class GenreController {
  path = '/genres';
  router = Router();

  constructor() {
    this.initializeRouter();
  }

  initializeRouter() {
    this.router.get(`${this.path}`, authJwt, this.getGenres);
  }

  getGenres = async (req, res, next) => {
    try {
      console.log('here');
      const genreServices = new GenreServices(
        GenreModel.find(),
        req.query
      ).search();

      const genres = await genreServices.query;

      if (!genres) {
        next(new HttpExceptions(404, 'No Genres Found'));
      } else {
        res.status(200).json({
          success: true,
          count: genres.length,
          genres,
        });
      }
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };
}

export default GenreController;
