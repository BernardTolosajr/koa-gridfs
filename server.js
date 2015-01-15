var koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger'),
    app = module.exports = koa(),
    port = process.env.PORT || 8000,
    env = process.env.NODE_ENV || 'development';

app.use(logger());
app.use(bodyParser());

//Routes
require('./config/routes')(app);

app.listen(port);
console.log('app listening on port: ', port);
