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

it('Check for DB Connection', function (done) {
    connection.connect(function (err, result) {
        if (err) {
            done(err);
            return;
        }
        expect(result).to.be.an('object')
        done();
    });
});

describe('Test for POST /url', function () {
    it('Send new Data to /url', function (done) {
        chai.request(server).post('/url').send({
            LongURL: "http://www.google.com",
            ShortURL: custom8URL,
            TimeCreated: '2021-06-19 16:52:50',
            TimeExpire: '2021-06-19 16:52:50'
        }).end(function (err, res) {
            expect(res).to.have.status(200)
            done()
        })
    })
    it('Send Duplicated Data to /url', function (done) {
        chai.request(server).post('/url').send({
            LongURL: "http://www.google.com",
            ShortURL: custom8URL,
            TimeCreated: '2021-06-19 16:52:50',
            TimeExpire: '2021-06-19 16:52:50'
        }).end(function (err, res) {
            expect(res).to.have.status(520)
            done()
        })
    })
})