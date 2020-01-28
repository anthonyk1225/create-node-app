'use strict';

const users = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    underscored: true,
  });

  users.associate = models => {
    users.hasMany(models.answers);
  };

  return users;
};

module.exports = users;
