const express = require("express");
const controller = require("./controller");
const router = express.Router()

// define the home page route
router
    .all("/", function (req, res, next) {
        if (!Object.keys(req.query).length) {
            res.status(404);
            res.send("provide query parameters yo!");

            return;
        }

        next();
    })
    .get("/", function (req, res) {
        const {id, from, to} = req.query;
        res.send(JSON.stringify(["get", req.query]));
    })
    .post("/", function (req, res) {
        const {id, dates} = req.query;
        console.log("CONTROLLER", controller);
        controller.createAvailability(id, dates);
        res.send(JSON.stringify(["post", req.query]));
    })
    .delete("/", function (req, res) {
        res.send(JSON.stringify(["delete", req.query]));
    });

module.exports = router;
