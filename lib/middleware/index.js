'use strict';
const models = require('../models');
const user_tokens = models.user_tokens;
const _ = require('lodash');

module.exports = {
	isAuth: async (req, res, next) => {
		// Kill request in for `x-token` header is provided
		if (!req.headers['x-token']) {
			return res.status(401).send({
				error: 'No x-token header provided.'
			});
		} else if (!req.headers['x-user-id']){
			return res.status(401).send({
				error: 'No x-user-id header provided.'
			});
		} else {
			try {
	            const user_token = await user_tokens.findOne({
	                where: {
	                    userId: req.headers['x-user-id'],
	                    token: req.headers['x-token']
	                }
	            });
	            if (user_token === null) {
					return res.status(400).send({
						error: 'Token not valid for user id provided'
					});
	            } else {
	            	return next();
	            }
			} catch (e) {
				console.warn(e);
				return e;
			}
		}
	}
};
