'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tripReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // run test to prevent dup tripReports => // '  dis ney worl   d' // 'DISNEYWORLD'
    category: {type: String, enum: ['outdoors', 'indoors', 'food']},
    postalCode: { type: String, require: true},
    content: { type: String, required: true },
    isPublished: Boolean
})
  
const TripReport = mongoose.model('TripReport', tripReportSchema);

module.exports = { TripReport };