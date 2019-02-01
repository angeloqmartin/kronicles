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
    locationName: { type: String, required: true }, // 'DISNEYWORLD'
    // originalNameTyped: { type: String, required: true } ,// '  dis ney worl   d'
    locationCategory: { type: String, require: true},
    postalCode: { type: String, require: true},
    content: { type: String, required: true },
    isPublished: Boolean
    // rating: { type: Number }, // 1-5 // add rating feature
})

const Trips = mongoose.model('Trips', userTripReportSchema);
const trips = new Trips({
    locationName: "DISNEYWORLD",
    locationCategory: "outdoors",
    postalCode: "32830",
    content:"The Walt Disney World Resort, also called Walt Disney World and Disney World, is an entertainment complex in Bay Lake and Lake Buena Vista, Florida, in the United States, near the cities Orlando and Kissimmee.",
    isPublished:true
})

// run test to prevent dup tripReports => // '  dis ney worl   d' // 'DISNEYWORLD'

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function () {
        console.log(`listening on ${this.address().port}...`)
    });
};


module.exports = app;