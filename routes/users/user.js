const users = require('express').Router();
const { getUsers, getUserByID, getUserByName, createNewUser } = require('../../queries/users');

users.get('/id/:id', getUserByID);
users.get('/name/:name', getUserByName);
users.get('/*', getUsers);

users.post('/createUser/', createNewUser);

module.exports = users;
