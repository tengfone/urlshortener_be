const express = require("express");
require('dotenv').config();
var fs = require('fs')
var https = require('https')
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

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app)
  .listen(port, function () {
    console.log(`Server is running on port ${port}.`)
  })
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });