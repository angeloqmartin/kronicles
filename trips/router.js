const express = require("express");
const router = express.Router();
const passport = require('passport');

const {
    TripReport
} = require('./model');

const jwtAuth = passport.authenticate('jwt', {
    session: false
});

router.get("/", jwtAuth, (req, res) => {
    return TripReport.find({})
        .populate("userId")
        .then(trips => {
            res.json(trips);
        })
})

router.post("/", jwtAuth, (req, res) => {
    const data = req.body;
    data.userId = req.user.id;
    return TripReport.create(data)
        .then(newTrip => {
            res.status(201).json(newTrip)
        })
})

router.delete("/:id", jwtAuth, (req, res) => {
    return TripReport.deleteOne({
            "_id": req.params.id,
            userId: req.user.id
        })
        .then(data => {
            res.json(data)
        })
})

router.put("/:id", jwtAuth, (req, res) => {
    return TripReport.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title,
                postalCode: req.body.postalCode,
                content: req.body.content,
                category: req.body.category
            }
        })

        .then(data => {
            res.json(data);
        })
})

module.exports = router;