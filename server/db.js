// * Connect Databasee and Server
const Pool = require("pg").Pool;
require('dotenv').config();

//todo: hide password in .env file 
const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
});

// export file
module.exports = pool;