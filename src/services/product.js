var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = {
  create: function(product) {
    return new Promise(function(resolve, reject) {
      var model = new Product(product);

      model.save(function(err, product) {
        if (err)
          return reject(err);
        else
          resolve({name: product.name, price: product.price});
      });
    });
  }
}
