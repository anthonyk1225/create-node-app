'use strict';
const models = require('../models');
const helpers = require('../helpers');
const users = models.users;
const user_tokens = models.user_tokens;

module.exports = {
    getUser: async (email) => {
        const user = await users.findOne({
            where: {
                email: email
            }
        });
        return user;
    },
    findOrCreateUser: async (user) => {
    	user = await users.findOrCreate({
    		where: {
    			first_name: user.first,
    			last_name: user.last,
    			email: user.email
    		}
    	})

        const created = user[1];
        user = user[0];

        if (created){
            const randomToken = helpers.createRandomToken();
            const token = await user_tokens.create({
                userId: user.id,
                token: randomToken,
                type: "account"
            })
    	}
        return {id: user.id, created: created};
    }
};
