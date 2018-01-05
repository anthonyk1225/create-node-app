'use strict';

const users = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        }, {
        classMethods: {
            associate(models) {
            }
        }
        }
    );
    return users;
}


module.exports = users;
