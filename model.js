'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tripReportSchema = new mongoose.Schema({
    locationName: { type: String, required: true }, // 'DISNEYWORLD'
    // run test to prevent dup tripReports => // '  dis ney worl   d' // 'DISNEYWORLD'
    postalCode: { type: String, require: true},
    content: { type: String, required: true },
    isPublished: Boolean
})
  
const TripReport = mongoose.model('TripReport', tripReportSchema);

module.exports = {TripReport};