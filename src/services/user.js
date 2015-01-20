var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  findById: function(id) {
    return new Promise(function(resolve, reject) {
      User
        .findOne({id: id})
        .populate('products')
        .exec(function(err, user) {
          if (err)
            reject(err);
          else
            resolve(user);
        });
    });
  }
};

