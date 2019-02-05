"use strict";

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { TripReport } = require('./model');

const app = express();

app.use(express.json());
app.use(express.static('public'));

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