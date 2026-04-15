var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var todosRouter = require('./routes/todos');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/todos', todosRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
