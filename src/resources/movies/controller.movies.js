import { Router } from 'express';
import HttpExceptions from '../../utils/exceptions/exception.http.js';
import MovieServices from './service.movies.js';

class MovieController {
  path = '/movies';
  router = Router();

  constructor() {
    this.initializeRoutes();
    this.MovieServices = new MovieServices();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.getMovies);
  }

  getMovies = async (req, res, next) => {
    try {
      const movies = await this.MovieServices.get();
      res.status(200).json({
        success: true,
        count: movies.length,
        movies,
      });
    } catch (error) {
      next(new HttpExceptions(404, error.message));
    }
  };
}

export default MovieController;
