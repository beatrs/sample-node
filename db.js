// * Connect Databasee and Server
const Pool = require("pg").Pool;
require('dotenv').config();

//todo: hide password in .env file 
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionString: process.env.DATABASE_URL
});

console.log(process.env.DATABASE_URL)

// export file
module.exports = pool;