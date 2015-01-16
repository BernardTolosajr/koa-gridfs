var app = require('../server.js');
var mongoose = require('mongoose');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var databaseHelper = require('./middlewares/database');

describe('Products', function() {

  var Product = mongoose.model('Product');

  before(function *() {
    var product = new Product({
      name: 'sample',
      price: 100
    });

    product.save(function(err, product) {
    })

  });

  it('should create new product', function *() {
    var n = Math.floor((Math.random() * 10) + 1);
    var res = yield

      request
        .post('/products')
        .field('Content-Type', 'multipart/form-data')
        .field('name', 'sample ' + n)
        .field('price', '100')
        .attach('image', __dirname + '/fixtures/file.txt')
        .attach('image', __dirname + '/fixtures/file.txt')
        .expect(201)
        .end();

      var body = res.body;

      expect(body.product.name).to.equal('sample ' + n);

  });

  it('should not create existing product', function *() {
    var res = yield

      request
        .post('/products')
        .field('Content-Type', 'multipart/form-data')
        .field('name', 'sample')
        .field('price', '100')
        .attach('image', __dirname + '/fixtures/file.txt')
        .expect(422)
        .end();

      var body = res.body;

      expect(body.message).to.equal('Invalid Entry');

  });

  after(function *() {
    databaseHelper.dropDatabase();
  });
});

