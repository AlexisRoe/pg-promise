const { newExpression } = require('@babel/types');
const db = require('../db/index');

const getUsers = async (_, res, next) => {
    try {
        const users = await db.any('SELECT * FROM users');
        res.status(200).json({
            status: 'success',
            message: 'return all users in the db',
            users,
        });
    } catch (error) {
        next(error);
    }
};

const getUserByID = async (req, res, next) => {
    const user_id = req.params.id;

    try {
        const user = await db.one('SELECT * FROM users where id = $1', [user_id]);
        res.status(200).json({
            status: 'success',
            message: `return data of user id: ${user_id}`,
            user,
        });
    } catch (error) {
        next(error);
    }
};

const getUserByName = async (req, res, next) => {
    const user_name = req.params.name;

    try {
        const user = await db.one('SELECT * FROM users where name = $1', [user_name]);
        res.status(200).json({
            status: 'success',
            message: `return data of user name: ${user_name}`,
            user,
        });
    } catch (error) {
        next(error);
    }
};

const createNewUser = async (req, res, next) => {
    const { name, age } = req.query;

    try {
        const newUser = await db.one('INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *', [name, age]);
        res.status(200).json({
            status: 'success',
            message: `new user ${name} with age ${age} created`,
            newUser,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUsers, getUserByID, getUserByName, createNewUser };
