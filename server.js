"use strict";

const mongoose = require('mongoose')
const express = require('express');
const app = express();

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/trips') // this ref the mongoDB installed on localhost
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function () {
        console.log(`listening on ${this.address().port}...`)
    });
};


module.exports = app;