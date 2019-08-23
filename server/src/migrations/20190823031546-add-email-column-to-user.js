'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'email'
    );
  }
};
