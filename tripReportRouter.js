const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { TripReport } = require('./model');
    
router.get("/", (req, res) => {
    TripReport.find()
    .then(trips => {
        res.json(trips);
    })
})
router.post("/", (req,res) => {
    TripReport.create(req.body)
    .then(data => {
        res.json(data)
    })
})
router.delete("/:id", (req, res) => {
    TripReport.deleteOne( { "_id" : req.params.id})
    .then(data => {
        res.json(data)
    })
})
router.put("/:id", (req, res) => {
    TripReport.update({
        id: req.params.id,
        locationName: req.body.locationName,
        postalCode: req.body.postalCode,
        content: req.body.content
    })
})

module.exports = router;