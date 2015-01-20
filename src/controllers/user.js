var Service = require('../../src/services/user');

exports.findById = function *() {
  var user = yield Service.findById(this.params.d);
  this.body = {user: user};
};
