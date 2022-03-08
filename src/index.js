import dotenv from 'dotenv';
import App from './app.js';
import config from './config/index.js';
import MovieController from './resources/movies/controller.movies.js';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = new App([new MovieController()], config.PORT);

app.listen();
