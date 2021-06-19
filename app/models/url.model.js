const sql = require("./db.js");

// Constructor
const Url = function (url) {
    this.LongURL = url.LongURL
    this.ShortURL = url.ShortURL
    this.TimeCreated = url.TimeCreated
    this.TimeExpire = url.TimeExpire
};

Url.create = (newURL, result) => {
    sql.query("INSERT INTO url SET ?", newURL, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created url: ", { ...newURL });
        result(null, { ...newURL });
    });
};

Url.findByShortURL = (ShortURL, result) => {
    console.log(ShortURL)
    sql.query(`SELECT * FROM url WHERE ShortURL='${ShortURL}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found URL: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Url;