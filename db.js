// * Connect Databasee and Server
const Pool = require("pg").Pool;
require('dotenv').config();


const dev = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const prod = process.env.DATABASE_URL

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionString: process.env.NODE_ENV === "production" ? prod : dev,
    ssl: {
        rejectUnauthorized: false
    }
});




// export file
module.exports = pool;