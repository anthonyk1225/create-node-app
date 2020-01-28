'use strict';

const answers = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    underscored: true,
  });

  answers.associate = models => {
    answers.belongsTo(models.words, {
      foreignKey: 'word_id',
    });
    answers.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
  };

  return answers;
};

module.exports = answers;
