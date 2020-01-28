'use strict';
const classes = require('../constants/classes');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes',
      classes,
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes');
  }
};
