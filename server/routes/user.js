'use strict'

const express = require('express');
const api = express.Router();

const { createUser, login } = require('../controllers/user');

api.post('/user', createUser);
api.post('/login', login);


module.exports = api;