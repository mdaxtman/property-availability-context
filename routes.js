const express = require("express");

const router = express.Router()

// define the home page route
router
    .all("/availabilities", function (req, res, next) {
        if (!req.params) {
            res.err();

            return;
        }

        next();
    })
    .get("/availabilities", function (req, res) {
        if (!req.params) {

        }
        const {id, from, to} = req.params;

    })
    .post("/availabilities", function (req, res) {
        res.send("post availabilities")
    })
    .delete("/availabilities", function (req, res) {
        res.send("delete availabilities")
    });

module.exports = router;
