exports.index = function *() {
  this.body = "Hello World";
}

exports.create = function *() {
  var object =this.request.body;
  object.created_at = new Date;
  this.status = 201;
  this.body = object;
}
