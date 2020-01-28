'use strict';
const words = require('../constants/words');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('words',
      words.map(word => {
        return {
          class_id: 1,
          ...word,
        }
      }),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('words');
  }
};
