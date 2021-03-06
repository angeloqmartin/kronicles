'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const tripReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['outdoors', 'indoors', 'food']
    },
    postalCode: {
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: false,
        required: [true, 'No User id found']
    },
    isPublished: Boolean,
})

const TripReport = mongoose.model('TripReport', tripReportSchema);

module.exports = {
    TripReport
};