'use strict';

const classes = (sequelize, DataTypes) => {
  const classes = sequelize.define('classes', {
    level: {
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
    },
    week: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
      allowNull: false,
    },
    focus: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    underscored: true,
  });

  classes.associate = models => {
    classes.hasMany(models.words);
  };

  return classes;
};

module.exports = classes;
