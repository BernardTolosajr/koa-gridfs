exports.index = function *() {
  this.body = "Hello World";
}

exports.create = function *() {
  var object =this.request.body;
  console.log(object);
  object.created_at = new Date;
  this.status = 201;
  this.body = object;
}
