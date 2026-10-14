// ./database/db-connector.js

// Get an instance of mysql we can use in the app
require('dotenv').config();    // Hide database credientials
var mysql = require('mysql2')



console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);
console.log("DB NAME:", process.env.DB_NAME);
// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    port            : process.env.DB_PORT,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
})

// Export it for use in our applicaiton
module.exports.pool = pool;