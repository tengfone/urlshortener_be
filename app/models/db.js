const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT,
    connectionLimit: 15,
    queueLimit: 30,
    acquireTimeout: 1000000
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Connected to SQL");
});

module.exports = connection;

const testConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT
});

module.exports = testConnection;