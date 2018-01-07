'user strict';
const express = require('express');
const router = express.Router();
const users = require('../db/users');
const middleware = require('../middleware');

router.post('/', async (req, res, next) => {
	let result = await users.findOrCreateUser(req.body);
	return res.json(result);
});

module.exports = router;
