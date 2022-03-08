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
    this.router.get(`${this.path}/genres/:genreName`, this.getMoviesByGenre);
  }

  getMovies = async (req, res, next) => {
    try {
      const resultsPerPage = 20;
      const movieServices = new MovieServices(MovieModel.find(), req.query)
        .search()
        .filter()
        .paginate(resultsPerPage);
      const movies = await movieServices.query;
      const total = await movieServices.total;
      res.status(200).json({
        success: true,
        page: movieServices.page,
        pages: Math.ceil(total / resultsPerPage),
        total,
        count: movies.length,
        movies,
      });
    } catch (error) {
      next(new HttpExceptions(404, error.message));
    }
  };

  getMoviesByGenre = async (req, res, next) => {
    const { genreName } = req.params;
    const resultsPerPage = 20;
    const movieServices = new MovieServices(MovieModel.find(), req.query)
      .searchByGenre(genreName)
      .filter()
      .paginate(resultsPerPage);
    const movies = await movieServices.query;
    const total = await movieServices.total;
    const page = movieServices.page;

    res.status(200).json({
      success: true,
      total,
      count: movies.length,
      pages: Math.ceil(total / resultsPerPage),
      page,
      movies,
    });
  };
}

export default MovieController;
