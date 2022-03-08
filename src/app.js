import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import errorMiddleware from './middlewares/middleware.error.js';
import config from './config/index.js';

class App {
  constructor(controllers, PORT) {
    this.express = express();
    this.PORT = PORT;

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  initializeMiddleware() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.express.use('/api', controller.router);
    });
  }

  initializeErrorHandling() {
    this.express.use(errorMiddleware);
  }

  initializeDatabaseConnection() {
    mongoose.connect(config.MONGO_URI).then((con) => {
      console.info(`Database connected with ${con.connection.host}`);
    });
  }

  listen() {
    this.express.listen(this.PORT, () => {
      console.info(`App is running on port ${this.PORT}`);
    });
  }
}

export default App;
