import MovieModel from './model.movie.js';

class MovieServices {
  constructor() {
    this.Movie = MovieModel;
  }
  async get() {
    try {
      const movies = await this.Movie.find();
      return movies;
    } catch (error) {
      throw new Error('Unable to find movies');
    }
  }
}

export default MovieServices;
