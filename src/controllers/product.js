var parse = require('co-busboy');
var fs = require('fs');
var path = require('path');
var os = require('os');
var Service = require('../../src/services/product');

exports.create = function *() {
  var parts = parse(this),
      part, name, price, description,
      fee, payment, user_id, category;
  var images = [];

  while (part = yield parts) {
    if (part.length) {
       switch (part[0]) {
          case 'name':
            name = part[1];
            break;
          case 'price':
            price = part[1];
            break;
          case 'desctiption':
            description = part[1];
            break;
          case 'user':
            user_id = part[1];
            break;
          case 'fee':
            fee = part[1];
            break;
          case 'payment':
            payment = part[1];
            break;
          case 'payment':
            category = part[1];
            break;
        }

     } else {

      var stream = fs.createWriteStream(
          path.join(os.tmpdir(), Math.random().toString()));

      var writestream = this.gridfs.createWriteStream({
          filename: part.filename,
          mode: 'w',
      });

      images.push({name: part.filename});

      //part.pipe(writestream);
      part.pipe(stream);
    }
  }

  try {

    var product = yield Service.create({
      _user: user_id,
      name: name,
      price: price,
      images: images
    });

    this.status = 201;

    this.body = {product: product};
  } catch (err) {
    this.status = 422;
    this.body = {message: 'Invalid Entry', err: err};
  }
}

exports.find = function *() {
  var product = yield Service.findOne(this.params.id);
  this.body = {product:product};
}

