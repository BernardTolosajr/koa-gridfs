var koa = require('koa'),
    logger = require('koa-logger'),
    app = module.exports = koa(),
    port = process.env.PORT || 8000,
    env = process.env.NODE_ENV || 'development';

app.use(logger());

//Routes
require('./config/routes')(app);

app.listen(port);
console.log('app listening on port: ', port);
