'use strict';

const users = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    users.associate = (models) => {
        models.users.hasMany(models.user_tokens, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return users;
};

module.exports = users;
