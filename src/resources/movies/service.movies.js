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
}

export default MovieServices;
