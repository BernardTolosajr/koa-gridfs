var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

module.exports = {
  create: function(product) {
    return new Promise(function(resolve, reject) {
      var model = new Product(product);

      console.log(product);

      var user = User.findById(product._user, function(err, user) {
        console.log('found ', user);
      });

      model.save(function(err, p) {
        if (err)
          return reject(err);
        else
          resolve({id: p._id,
            name: p.name,
            price: p.price,
            images: p.images
          });
      });
    });
  },

  findOne: function(id) {
    return new Promise(function(resolve, reject) {
      Product
        .findOne({_id: id})
        .exec(function(err, product) {
          if (err) return reject(err);
          resolve({id: product._id,
            name: product.name,
            price: product.price,
            images: product.images
          });
        });
    });
  }
}
