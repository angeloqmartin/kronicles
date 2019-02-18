"use strict";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

mongoose.Promise = global.Promise;

const app = express();
app.use(morgan('common'));

const tripReportRouter = require("./tripReportRouter")
app.use(express.static('public'));
app.use(express.json());

//import router and route requests to HTTP requests
app.use("/trip-report", tripReportRouter);

// this ref the mongoDB installed on localhost
mongoose.connect('mongodb://localhost/trips')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.log(`listening on ${this.address().port}...`)
  });
};

module.exports = app;