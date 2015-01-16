var router = require('koa-router');

var smokeController = require('../src/controllers/smoke');
var productController = require('../src/controllers/product');

module.exports = function(app) {
  app.use(router(app));
  app.get('/', smokeController.index);
  app.post('/', smokeController.create);
  app.post('/products', productController.create);
};

