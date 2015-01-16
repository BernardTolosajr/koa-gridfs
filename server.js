var fs = require('fs'),
    koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger'),
    cors = require('koa-cors'),
    app = module.exports = koa(),
    port = process.env.PORT || 8000,
    env = process.env.NODE_ENV || 'development',
    gridfs = require('./lib/gridfs');

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');

/**
  * Config
*/
var config = require('./config/config');

/**
 * Connect to database
*/

var conn = mongoose.createConnection(config.mongo.url);
mongoose.connect(config.mongo.url);
mongoose.connection.on('error', function (err) {
  console.log(err);
})

Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

/**
* Load the models
*/
var models_path = config.app.root + '/src/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('js')) {
    require(models_path + '/' + file);
  }
});

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(gridfs(gfs));

//Routes
require('./config/routes')(app);

app.listen(port);
console.log('app listening on port: ', port);
