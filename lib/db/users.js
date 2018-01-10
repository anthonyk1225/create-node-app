'use strict';
const helpers = require('../helpers');
const models = require('../models');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const users = models.users;
const user_tokens = models.user_tokens;
const _ = require('lodash');

module.exports = {
    getUser: async (userId) => {
        try {
            const user = await users.findOne({
                where: {
                    id: userId
                },
                attributes: ['id', 'first_name', 'last_name', 'email']
            });
            return user;
        } catch (e) {
            console.warn(e);
            return e;
        }
    },
    getOrCreateUser: async (user) => {
        let created;

        try {
            const hash = bcrypt.hashSync(user.password, salt);
            user = await users.findOrCreate({
                where: {
                    email: user.email,
                },
                defaults: {
                    first_name: user.first,
                    last_name: user.last,
                    password: hash
                }
            })

            created = user[1];
            user = user[0];

        } catch (e) {
            console.warn(e);
            return e;
        }

        if (created){
            const randomToken = helpers.createRandomToken();
            try {
                const token = await user_tokens.create({
                    userId: user.id,
                    token: randomToken,
                    type: "register"
                })
            } catch (e) {
                console.warn(e);
                return e;
            }
    	}

        return _.assign({}, _.omit(user.dataValues, ['createdAt', 'updatedAt', 'password']), {created});
    }
};
