var router = require('koa-router');

var smokeController = require('../src/controllers/smoke');

module.exports = function(app) {
  app.use(router(app));
  app.get('/',smokeController.index);
  app.post('/',smokeController.create);
};

