var express = require('express'),
  routesCreator = require('./../routes/routesCreator'),
  resources = require('./../resources/model'),
  converter = require('./../middleware/converter'),
  bodyParser = require('body-parser'),
  cons = require('consolidate'),
  cors = require('cors'),
  mdns = require('mdns');

var app = express();
app.use(bodyParser.json());

app.use('/', routesCreator.create(resources));


app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');

// For representation design
//app.use(cors());

// Set the public folder (for .css & co)
app.use(express.static(__dirname + '/../public'));

app.use(converter);


// issue with WS: see: https://github.com/HenningM/express-ws/issues/10
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //var err = new Error('Resource not Found');
  //err.status = 404;
  //next(err);
//});

module.exports = app;