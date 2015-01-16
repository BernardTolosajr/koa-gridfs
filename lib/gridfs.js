module.exports = function(options) {
  return function *gridfs(next) {
    this.gridfs = options;
    yield next;
  }
}
