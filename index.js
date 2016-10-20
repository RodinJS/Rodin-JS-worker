/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const flash = require('express-flash');
const path = require('path');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');

/**
 * Controllers (route handlers).
 */
const apiController = require('./server/controllers');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', 4000);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());

/**
 * Primary app routes.
 */
app.get('/webhooks/gogs', apiController.get);
app.post('/webhooks/gogs', apiController.post);
app.all('*', (req, res, next) => res.send({"Gago say's": "Workers are working..."}));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d.', chalk.green('✓'), app.get('port'));
});

module.exports = app;