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

router.put("/", (req, res) => {
    TripReport.update({ "_id" : req.params.id})
    .then(data => {
        res.json(data)
    })
})

module.exports = router;