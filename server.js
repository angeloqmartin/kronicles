"use strict";

const mongoose = require('mongoose')
const express = require('express');
const app = express();

app.use(express.static('public'));

// this ref the mongoDB installed on localhost
mongoose.connect('mongodb://localhost/trips')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const userTripReportSchema = new mongoose.Schema({
    // objectID: ? do I need this
    locationName: { type: String, required: true }, // 'DISNEYWORLD'
    originalNameTyped: { type: String, required: true } ,// '  dis ney worl   d'
    locationCategory: { type: String, require: true},
    locationPostalCode: { type: String, require: true},
    content: { type: String, required: true },
    isPublished: Boolean
    // rating: { type: Number }, // 1-5 // add rating feature
})


// run test to prevent dup tripReports => // '  dis ney worl   d' // 'DISNEYWORLD'


if (require.main === module) {
    app.listen(process.env.PORT || 8080, function () {
        console.log(`listening on ${this.address().port}...`)
    });
};


module.exports = app;