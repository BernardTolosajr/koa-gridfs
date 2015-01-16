var mongoose = require('mongoose');
var co = require('co');

var Models = [
  mongoose.model('Product')
];

exports.dropDatabase = function() {
  co(function *() {
    return yield Models.map(dropCollection);
  });
};

var dropCollection = function (Model) {
  return new Promise(function (resolve, reject) {
    Model.collection.remove(function (err) {
    if(err) return reject(err);
      resolve();
    });
  });
};
