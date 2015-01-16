var parse = require('co-busboy');
var fs = require('fs');
var path = require('path');
var os = require('os');
var Service = require('../../src/services/product.js');

exports.create = function *() {
  var parts = parse(this),
      part, name, price;


  while (part = yield parts) {
    if (part.length) {
       switch (part[0]) {
          case 'name':
            name = part[1];
            break;
          case 'price':
            price = part[1];
          break;
        }

     } else {

      var stream = fs.createWriteStream(
          path.join(os.tmpdir(), Math.random().toString()));

      var writestream = this.gridfs.createWriteStream({
          filename: part.filename,
          mode: 'w',
      });

      //part.pipe(writestream);
      part.pipe(stream);
    }
  }

  try {
    var product = yield Service.create({
      name: name,
      price: price
    });

    this.status = 201;

    this.body = {product: {
        name: product.name,
        price: product.price
    }};
  } catch (err) {
    this.status = 422;
    this.body = {message: 'Invalid Entry'};
  }
}

