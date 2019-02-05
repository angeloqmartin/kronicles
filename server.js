"use strict";

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tripReportRouter = require("./tripReportRouter")
const { TripReport } = require('./model');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get("/tripReport", (req, res) => {
  TripReport
  .find()
  .then(posts => {
    res.json(posts.map(posts => posts.serialize()));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error:'error'})
  });
});

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