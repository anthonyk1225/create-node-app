'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('user_tokens', 'type', 
        {
          type: Sequelize.ENUM('register'),
          allowNull: false,
        }
      );
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('user_tokens', 'type', {
        type: DataTypes.STRING,
        allowNull: false
      });
  }
};
