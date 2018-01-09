'use strict';

const user_tokens = (sequelize, DataTypes) => {
    const user_tokens = sequelize.define('user_tokens', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            values: ['register'],
            allowNull: false,
        },
    });
    user_tokens.associate = (models) => {
        models.user_tokens.belongsTo(models.users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return user_tokens;
};

module.exports = user_tokens;
