'use strict';
const models = require('../models');
const users = models.users;

module.exports = {
    findOrCreateUser:(user) => {
    	return users.findOrCreate({
    		where: {
    			first_name: user.first,
    			last_name: user.last,
    			email: user.email,
    		}
    	}).spread((user, created) => {
            return {id: user.id, created: created}
    	}).catch(err => {
    		return err;
    	})
    }
};
