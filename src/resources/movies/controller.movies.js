import { Router } from 'express';
import HttpExceptions from '../../utils/exceptions/exception.http.js';
import MovieServices from './service.movies.js';
import MovieModel from './model.movie.js';
import { authJwt } from '../user/service.auth.js';
class MovieController {
  path = '/movies';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, authJwt, this.getMovies);

    this.router.get(`${this.path}/:movieId`, authJwt, this.getMovieById);

    this.router.post(`${this.path}/:movieId/reviews`, authJwt, this.addReview);

    this.router.get(
      `${this.path}/genres/:genreName`,
      authJwt,
      this.getMoviesByGenre
    );

    this.router.get(
      `${this.path}/directors/:directorName`,
      authJwt,
      this.getMoviesByDirector
    );

    this.router.get(
      `${this.path}/actors/:actorName`,
      authJwt,
      this.getMoviesByActor
    );

    this.router.get(`${this.path}/featured`, authJwt, this.getMoviesByFeatured);
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

  getMovieById = async (req, res, next) => {
    const { movieId } = req.params;
    const movieServices = new MovieServices(
      MovieModel.find(),
      req.query
    ).searchMovieById(movieId);

    const movie = await movieServices.query;

    if (!movie) {
      res.status(404).json({
        success: false,
        message: 'No movie found',
      });
    } else {
      res.status(200).json({
        success: true,
        movie,
      });
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
          director: movies[0].director,
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
      let actor = {};
      actor = movies.map((movie) => {
        let result = movie.actors.map((actor) => {
          if (actor.name === actorName) {
            return actor;
          }
        });

        return result;
      });

      let filter = {};
      actor.forEach((a) => {
        if (a) {
          filter.test = a;
        }
      });

      if (!movies) {
        next(new HttpExceptions(404, `No movies found by ${actorName}`));
      } else {
        res.status(200).json({
          success: true,
          actor: filter.test.filter(function (a) {
            return a !== undefined;
          })[0],
          count: movies.length,
          movies,
        });
      }
    } catch (error) {
      next(new HttpExceptions(500, error.message));
    }
  };

  addReview = async (req, res, next) => {
    try {
      const { movieId } = req.params;

      const movieServices = new MovieServices(MovieModel.find(), req.query)
        .searchMovieById(movieId)
        .addReview(req.body, req.user);

      const updateStatus = await movieServices.query;

      if (updateStatus.knowledge) {
        res.status(204).json({
          success: false,
          message: 'Failed to add review',
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'Successfully added a review',
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default MovieController;
