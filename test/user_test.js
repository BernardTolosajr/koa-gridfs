var app = require('../server.js');
var mongoose = require('mongoose');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;
var databaseHelper = require('./middlewares/database');

describe('Users', function() {
  var User = mongoose.model('User');
  var Product = mongoose.model('Product');
  var user;

  before(function *() {
    user = new User({
      name: 'Bernard 1'
    });

    var product = new Product({
      _user: user._id,
      name: 'sample 01',
      price: 100,
      images: [{name: 'sample 1'}]
    });

    var product1 = new Product({
      _user: user._id,
      name: 'sample 2',
      price: 500,
      images: [{name: 'sample 1'}]
    });

    user.save(function(err, user) {
      product.save(function(err, product) {
      });
      product1.save(function(err, product) {
      });
    })

    user.products.push(product);
    user.products.push(product1);

  });

  it("should fetch products", function *() {
    var res = yield

    request
      .get('/users/' + user._id)
      .expect(200)
      .end()

    var body = res.body;

    expect(body.user).to.be.not.empty

    /*
    Product
      .find({_user: user._id})
      .exec(function (err, products) {
        if (err) return handleError(err);
        console.log('The products are an array: ', products);
      })

    */
  })

  after(function *() {
    //databaseHelper.dropDatabase();
  });

});
