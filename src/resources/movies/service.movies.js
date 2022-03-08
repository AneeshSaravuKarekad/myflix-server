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

      console.log({ ...title });
      this.query = this.query.find({ ...title });
      this.total = this.query.model.countDocuments(this.query).exec();
      return this;
    } catch (error) {
      throw new Error('Unable to find movies');
    }
  }

  searchByGenre(genreName) {
    this.query = this.query.find({
      genres: {
        $elemMatch: { name: genreName },
      },
    });
    this.total = this.query.model.countDocuments(this.query).exec();
    return this;
  }

  paginate(resultPerPage) {
    const currentPage = parseInt(this.queryString.page) || 1;
    const skip = (currentPage - 1) * resultPerPage;
    this.page = currentPage;
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default MovieServices;
