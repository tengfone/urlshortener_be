module.exports = app => {
    const url = require("../controllers/url.controller.js");
    // Create a new URL
    app.post("/url", url.create);

    // Get a URL
    app.get("/:ShortURL", url.findURL);
};