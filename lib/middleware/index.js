'use strict';

module.exports = {
	isAuth: async (req, res, next) => {
		// Kill request in for `x-token` header is provided
		if (!req.headers['x-token']) {
			return res.status(403).send({
				error: 'No x-token header had been provided.'
			});
		} else {
			return next();
		}
	}
};
