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
    this.router.get(
      `${this.path}/directors/:directorName`,
      this.getMoviesByDirector
    );
    this.router.get(`${this.path}/actors/:actorName`, this.getMoviesByActor);
    this.router.get(`${this.path}/featured`, this.getMoviesByFeatured);
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
      next(new HttpExceptions(500, error.message));
    }
  };

  getMoviesByFeatured = async (req, res, next) => {
    try {
      const movieServices = new MovieServices(
        MovieModel.find(),
        req.query
      ).searchByFeatured();

      const movies = await movieServices.query;
      if (!movies) {
        next(new HttpExceptions(404, 'No featured movies'));
      } else {
        res.status(200).json({
          success: true,
          count: movies.length,
          movies,
        });
      }
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };

  getMoviesByGenre = async (req, res, next) => {
    try {
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
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };

  getMoviesByDirector = async (req, res, next) => {
    try {
      const { directorName } = req.params;
      const movieServices = new MovieServices(MovieModel.find(), {
        'director.name': directorName,
      }).searchByDirector();

      const movies = await movieServices.query;

      if (!movies) {
        next(new HttpExceptions(404, `No movies found by ${directorName}`));
      } else {
        res.status(200).json({
          success: true,
          count: movies.length,
          movies,
        });
      }
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };

  getMoviesByActor = async (req, res, next) => {
    try {
      const { actorName } = req.params;
      const movieServices = new MovieServices(
        MovieModel.find(),
        req.query
      ).searchByActor(actorName);
      const movies = await movieServices.query;

      if (!movies) {
        next(new HttpExceptions(404, `No movies found by ${actorName}`));
      } else {
        res.status(200).json({
          success: true,
          count: movies.length,
          movies,
        });
      }
    } catch (error) {}
  };
}

export default MovieController;
