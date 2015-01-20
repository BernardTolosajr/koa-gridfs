var app = require('../server.js');
var mongoose = require('mongoose');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var databaseHelper = require('./middlewares/database');

function createUser() {
  var User = mongoose.model('User');
  return new Promise(function(resolve, reject) {
    var user = new User({
      name: 'Bernard'
    });

    user.save(function(err, user) {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

describe('Products', function () {

  var Product = mongoose.model('Product');
  var user;

  before(function *() {
    user = yield createUser();
    user_id = user._id;

    var product = new Product({
      _user: user._id,
      name: 'sample',
      price: 100,
      images: [{name: 'sample 1'}]
    });

    product.save(function(err, product) {
    })

  });

  it('should create new product', function *() {
    var n = Math.floor((Math.random() * 10) + 1);
    var res = yield

      request
        .post('/products')
        .field('name', 'sample ' + n)
        .field('price', '100')
        .field('user', user_id)
        .attach('image', __dirname + '/fixtures/file.txt')
        .attach('image', __dirname + '/fixtures/file1.txt')
        .expect(201)
        .end();

      var body = res.body;

      expect(body.product.name).to.equal('sample ' + n);
      expect(body.product.images).to.have.length.of.at.least(2);
  });

  it('should not create existing product', function *() {
    var res = yield

      request
        .post('/products')
        .field('Content-Type', 'multipart/form-data')
        .field('name', 'sample')
        .field('price', '100')
        .field('user', user_id)
        .attach('image', __dirname + '/fixtures/file.txt')
        .expect(422)
        .end();

      var body = res.body;

      expect(body.message).to.equal('Invalid Entry');
  });

  /*
  it('should find products', function *() {
    var res = yield

      request
        .get('/products/' + id)
        .expect(200)
        .end();

      var body = res.body;

      expect(body.product).to.be.not.empty;
  });
  */


  after(function *() {
    databaseHelper.dropDatabase();
  });
});

