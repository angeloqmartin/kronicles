const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { TripReport } = require('./model');
    
router.get("/", (req, res) => {
    return TripReport.find()
    .then(trips => {
        res.json(trips);
    })
})
router.post("/", (req,res) => {
    return TripReport.create(req.body)
    .then(data => {
        res.json(data).status(201)
    })
})
router.delete("/:id", (req, res) => {
    return TripReport.deleteOne( { "_id" : req.params.id})
    .then(data => {
        res.json(data)
    })
})
router.put("/:id", (req, res) => {
    return TripReport.update({
        id: req.params.id,
        title: req.body.title,
        postalCode: req.body.postalCode,
        content: req.body.content,
        category: req.body.category
    })
    .then(data => {
        res.json(data);
    })
})

module.exports = router;