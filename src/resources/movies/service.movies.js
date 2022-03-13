/**
 * @class BaseController
 * @description Implements different API features
 *
 */

class MovieServices {
  /**
   * @constructor
   * @param {*} query
   * @param {Object} queryStr
   */
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.total;
    this.page;
  }

  /**
   * @function search
   * @description Implements partial search of documents
   * @returns {Object}
   */
  search() {
    try {
      const title = this.queryString.title
        ? {
            title: {
              $regex: this.queryString.title,
              $options: 'i',
            },
          }
        : {};

      this.query = this.query.find({ ...title });
      this.total = this.query.model.countDocuments(this.query).exec();
      return this;
    } catch (error) {
      throw new Error('Unable to find movies');
    }
  }

  /**
   * @function searchByFeatured
   * @returns {Object}
   */
  searchByFeatured() {
    this.query = this.query.find({ featured: true });
    return this;
  }

  searchMovieById(movieId) {
    this.query = this.query.findOne({ _id: movieId });
    return this;
  }

  /**
   * @function searchByGenre
   * @param {String} genreName
   * @returns {Object}
   */

  searchByGenre(genreName) {
    this.query = this.query.find({
      genres: {
        $elemMatch: { name: genreName },
      },
    });
    this.total = this.query.model.countDocuments(this.query).exec();
    return this;
  }

  /**
   * @function searchByActor
   * @param {String} actorName
   * @returns {Object}
   */
  searchByActor(actorName) {
    this.query = this.query.find({
      actors: {
        $elemMatch: { name: actorName },
      },
    });
    this.total = this.query.model.countDocuments(this.query).exec();
    return this;
  }

  /**
   * @function searchByDirector
   * @returns {Object}
   */
  searchByDirector() {
    this.query.find(this.queryString);
    return this;
  }

  paginate(resultPerPage) {
    const currentPage = parseInt(this.queryString.page) || 1;
    const skip = (currentPage - 1) * resultPerPage;
    this.page = currentPage;
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove fields for feature
    const removeFields = ['title', 'page', 'limit'];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for rating and release Year
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

export default MovieServices;
