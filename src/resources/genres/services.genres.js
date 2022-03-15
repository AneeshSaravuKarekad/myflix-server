class GenreServices {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    this.query = this.query.find();
    return this;
  }
}

export default GenreServices;
