const pgp = require('pg-promise')({});

const config = {
    host: 'localhost',
    port: 5432,
    database: 'grovers_groomers',
    user: process.env.db_user,
    password: process.env.db_password,
    max: 30,
};

const db = pgp(config);

module.exports = db;
