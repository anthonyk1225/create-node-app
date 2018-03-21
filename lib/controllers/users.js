'use strict';
const express = require('express');
const router = express.Router();
const users = require('../db/users');
const middleware = require('../middleware');

router.get('/', middleware.isAuth, async (req, res, next) => {
	let result = await users.getUser(req.headers['x-user-id']);
	if (result === null){
		// No user was found
		return res.status(404).send({
			error: 'The specified user could not be found'
		});
	}
	// User was found
	return res.json(result);
});

router.post('/', async (req, res, next) => {
	let result = await users.getOrCreateUser(req.body);
	return res.json(result);
});

router.post('/login', async (req, res, next) => {
	let result = await users.login(req.body.email, req.body.password);
	if (result === null){
		// No user was found
		return res.status(404).send({
			error: 'The specified user could not be found'
		});
	} else if (result === false) {
		// Wrong combo of email and password
		return res.status(400).send({
			error: 'The specified user and password do not match'
		});
	}
	// User was found and everything matches up
	return res.json(result);
});

router.post('/receivebackgroundinfo', async(req, res, next) => {
	console.log(req);
	return res.json(true);
});

module.exports = router;
