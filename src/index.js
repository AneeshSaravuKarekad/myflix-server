import dotenv from 'dotenv';
import App from './app.js';
import config from './config/index.js';
import GenreController from './resources/genres/controller.genres.js';
import MovieController from './resources/movies/controller.movies.js';
import UserController from './resources/user/controller.user.js';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = new App(
  [new MovieController(), new UserController(), new GenreController()],
  config.PORT
);

app.listen();
