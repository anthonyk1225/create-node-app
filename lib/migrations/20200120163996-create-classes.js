'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      level: {
        type: Sequelize.ENUM("1", "2"),
        allowNull: false,
      },
      week: {
        type: Sequelize.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
        allowNull: false,
      },
      focus: {
        type: Sequelize.STRING,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes');
  }
};
