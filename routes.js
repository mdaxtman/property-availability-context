const express = require("express");
const controller = require("./controllers");
const router = express.Router();
const moment = require("moment");
const requestValidation = require("./utils/request-validation");

const getDefaultRange = () => (
    [
        moment(new Date()).format(),
        moment(new Date()).add(1, "month").format()
    ]
);

// define the home page route
router
    .all("/", function (req, res, next) {
        const {range} = req.query;

        if (!requestValidation.isDateRangeValid(range)) {
            res.status(400);
            res.send("range query is not properly formatted")
        }

        next();
    })
    .get("/", function (req, res) {
        const {id, range = getDefaultRange()} = req.query;

        if (!id) {
            controller.getAvailabilityForAllProperties(range)
                .then((data) => {
                    res.status(200);
                    res.send(JSON.stringify(data));
                })
                .catch(() => {
                    res.status(500);
                    res.send("internal server error");
                });
        } else {
            controller.getAvailabilityForProperty(id, range)
            .then((data) => {
                res.status(200);
                res.send(JSON.stringify(data));
            })
            .catch(() => {
                res.status(500);
                res.send("internal server error");
            });
        }
    })
    .get("/isavailable", function(req, res) {
        const {id, range = getDefaultRange()} = req.query;

        if (!id) {
            res.status(400);
            res.send("Must include a property id");
        }

        controller.isAvailable(id, range)
            .then((data) => {
                res.status(200);
                res.send(JSON.stringify(data));
            })
            .catch((err) => {
                console.error("ERROR", err);

                res.status(500);
                res.send("internal server error");
            });
    })
    .put("/", function (req, res) {
        const {id, range} = req.query;

        if (!id) {
            res.status(400).send("id query must be present for this request");
        }

        controller
            .createAvailability(id, range)
            .then((data) => {
                res.status(201).send(JSON.stringify(data));
            })
            .catch((err) => {
                console.error(err);

                res.status(500).send("internal server error");
            });
    })
    .delete("/", function (req, res) {
        res.send(JSON.stringify(["delete", req.query]));
    });

module.exports = router;
