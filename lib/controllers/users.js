'use strict';
const express = require('express');
const router = express.Router();
const users = require('../db/users');
const middleware = require('../middleware');

router.get('/', middleware.isAuth, async (req, res, next) => {
	let result = await users.getUser(req.query.email);
	return res.json(result);
});

router.post('/', async (req, res, next) => {
	let result = await users.findOrCreateUser(req.body);
	return res.json(result);
});

module.exports = router;
