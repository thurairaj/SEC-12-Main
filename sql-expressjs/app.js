const express = require('express');
require('./models')

const app = express();

app.use(express.json());

module.exports = app;
