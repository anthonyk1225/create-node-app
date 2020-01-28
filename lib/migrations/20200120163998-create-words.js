'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('words', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      english: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      japanese: {
        type: Sequelize.STRING,        
        allowNull: false
      },
      hiragana: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      class_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'classes',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('words');
  }
};
