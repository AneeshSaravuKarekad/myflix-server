import { Router } from 'express';
import HttpExceptions from '../../utils/exceptions/exception.http.js';
import MovieServices from './service.movies.js';
import MovieModel from './model.movie.js';
class MovieController {
  path = '/movies';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.getMovies);
  }

  getMovies = async (req, res, next) => {
    try {
      const movieServices = new MovieServices(
        MovieModel.find(),
        req.query
      ).search();
      const movies = await movieServices.query;
      const total = await movieServices.total;
      res.status(200).json({
        success: true,
        total,
        movies,
      });
    } catch (error) {
      next(new HttpExceptions(404, error.message));
    }
  };
}

export default MovieController;
