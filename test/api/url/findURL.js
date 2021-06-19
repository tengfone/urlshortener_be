var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../../../server')
const expect = require('chai').expect;
require('dotenv').config();
const mysql = require("mysql");

var base62 = require('base62-random');
let custom8URL = base62(8);

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT
});

describe('Test for GET /:ShortURL', function () {
    // Ensure there is a shortURL:test inside the MySQL DB
    it('Able to retrieve LongURL?', function (done) {
        chai.request(server).get('/test').end(function (err, res) {
            expect(res).to.have.status(200)
            done()
        })
    })
})