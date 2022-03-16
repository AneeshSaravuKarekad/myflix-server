import { Router } from 'express';

class HomeController {
  path = '/';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.getHomePage);
  }

  getHomePage = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <div>
        <h1>Welcome to myFlix API</h1>
        <h3>Visit : for documentation</h3>
      </div>
  `);
  };
}

export default HomeController;
