'use strict';

const user_tokens = (sequelize, DataTypes) => {
    const user_tokens = sequelize.define('user_tokens', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return user_tokens;
};

module.exports = user_tokens;
