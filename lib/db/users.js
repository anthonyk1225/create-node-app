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
            let user = await users.findOne({
                where: {
                    id: userId
                },
                attributes: ['id', 'first_name', 'last_name', 'email']
            });
            user = _.omit(user.dataValues, ['createdAt', 'updatedAt', 'password']);
            return user;
        } catch (e) {
            console.warn(e);
            return e;
        }
    },    
    getOrCreateUser: async (body) => {
        let created, user;

        try {
            const hash = bcrypt.hashSync(body.password, salt);
            user = await users.findOrCreate({
                where: {
                    email: body.email,
                },
                defaults: {
                    first_name: body.first,
                    last_name: body.last,
                    password: hash
                }
            });

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
                });
            } catch (e) {
                console.warn(e);
                return e;
            }
    	}

        return _.assign({}, _.omit(user.dataValues, ['createdAt', 'updatedAt', 'password']), {created});
    },
    login: async (email, password) => {
        try {
            let user = await users.findOne({
                include: [
                    {
                        model: user_tokens
                    }
                ],
                where: {
                    email: email
                }
            });
            if (user === null){
                return user;
            } else {
                const match = bcrypt.compareSync(password, user.password);
                if (match){
                    user = _.omit(user.dataValues, ['createdAt', 'updatedAt', 'password']);
                    return _.assign({}, _.pick(user.user_tokens[0], ['token']), user);
                } else {
                    return false;
                }
            }
        } catch (e) {
            console.warn(e);
            return e;
        }
    } 
};
