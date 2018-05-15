const express = require("express");
const controller = require("./controllers");
const router = express.Router();
const moment = require("moment");
const groupDatesById = require("./utils/group-dates-by-id").default;

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

        if (range) {
            if (Array.isArray(range)) {
                const from = Date.parse(range[0]);
                const to = Date.parse(range[1]);

                if (from && to && from < to) {
                    next();

                    return;
                }
            }

            res.status(400);
            res.send("range query is not properly formatted")
        }

        next();
    })
    .get("/", function (req, res) {
        const {id, range = getDefaultRange()} = req.query;

        if (!id) {
            console.log(groupDatesById);

            controller.getAvailabilityForAllProperties(range)
                .then(groupDatesById)
                .then((data) => {
                    res.status(200);
                    res.send(JSON.stringify(data));
                })
                .catch(() => {
                    res.status(500);
                    res.send("internal server error");
                });
        } else {
            console.log("HIIIIII");
            controller.getAvailabilityForProperty(id, range)
            .then(groupDatesById)
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
    .put("/", function (req, res) {
        const {id, dates} = req.query;

        controller.createAvailability(id, dates);
        res.send(JSON.stringify(["post", req.query]));
    })
    .delete("/", function (req, res) {
        res.send(JSON.stringify(["delete", req.query]));
    });

module.exports = router;
