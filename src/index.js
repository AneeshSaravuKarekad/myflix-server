import dotenv from 'dotenv';
import App from './app.js';
import config from './config/index.js';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = new App([], config.PORT);

app.listen();
