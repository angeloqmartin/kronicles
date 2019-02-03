// 'use strict';

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const tripReportSchema = new mongoose.Schema({
//     locationName: { type: String, required: true }, // 'DISNEYWORLD'
//     // run test to prevent dup tripReports => // '  dis ney worl   d' // 'DISNEYWORLD'
//     locationCategory: { type: String, require: true},
//     postalCode: { type: String, require: true},
//     content: { type: String, required: true },
//     isPublished: Boolean
// })

// tripReportSchema.methods.serialize = function() {
//     return {
//       id: this._id,
//       locationName: this.locationName,
//       content: this.content,
//     };
//   };

  
// const Trip = mongoose.model('Trip', tripReportSchema);
// const TripReport = mongoose.model('TripReport', tripReportSchema);

// module.exports = {TripReport};