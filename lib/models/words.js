'use strict';

const words = (sequelize, DataTypes) => {
  const words = sequelize.define('words', {
    english: {
      type: DataTypes.STRING,
      allowNull: false
    },
    japanese: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hiragana: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    underscored: true,
  });

  words.associate = models => {
    words.hasMany(models.answers);
    words.belongsTo(models.classes, {
      foreignKey: 'class_id',
    });
  };

  return words;
};

module.exports = words;
