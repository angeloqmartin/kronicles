const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { TripReport } = require('./model');

async function createCourse() {
    const trip = new TripReport({
        locationName: "Six Flags Magic Mountain",
        postalCode: "91355",
        content:"It is the largest amusement park company in the world, based on the number of properties owned, and is ranked seventh in terms of attendance.",
        isPublished:true
    })
    const result = await trip.save();
    console.log(result);
}

// createCourse();

router.get("/", (req, res) => {
    TripReport.find()
    .then(trips => {
        res.json(trips);
    })
})

module.exports = router;