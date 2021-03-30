const pgp = require('pg-promise')({});

const config = {
    host: 'localhost',
    port: 5432,
    database: 'grovers_groomers',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30,
};

const db = pgp(config);

module.exports = db;
