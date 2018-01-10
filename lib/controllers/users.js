'use strict';
const express = require('express');
const router = express.Router();
const users = require('../db/users');
const middleware = require('../middleware');
const _ = require('lodash');

router.get('/', middleware.isAuth, async (req, res, next) => {
	let result = await users.getUser(req.headers['x-user-id']);
	result = _.omit(result.dataValues, ['password']);
	return res.json(result);
});

router.post('/', async (req, res, next) => {
	let result = await users.getOrCreateUser(req.body);
	return res.json(result);
});

module.exports = router;
