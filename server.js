const express = require("express");
require('dotenv').config();
const cors = require('cors');

const port = 3001

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

require("./app/routes/url.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});