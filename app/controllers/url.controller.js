const e = require("express");
const URL = require("../models/url.model.js");

// Create and Save a URL
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const url = new URL({
        LongURL: req.body.LongURL,
        ShortURL: req.body.ShortURL,
        TimeCreated: req.body.TimeCreated,
        TimeExpire: req.body.TimeExpire
    });

    // Save URL in the database
    URL.create(url, (err, data) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.statusMessage = "SQL Duplicate Key"
                res.status(520).send()
            } else {
                res.statusMessage = "Server Error"
                res.status(500).send()
            }
        }
        else {
            res.status(200).send(data)
        };
    });
};


// Create and Save a URL
exports.findURL = (req, res) => {
    URL.findByShortURL(req.params.ShortURL, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found URL with ShortURL ${req.params.ShortURL}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving URL with ShortURL " + req.params.ShortURL
                });
            }
        } else {
            res.status(200).send(data)
        }
    });
};