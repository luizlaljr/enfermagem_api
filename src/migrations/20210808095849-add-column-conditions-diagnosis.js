'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('diagnostics',
     'conditions',{ 
      type: Sequelize.TEXT,
      allowNull: true,
     });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('diagnostics', 'conditions');
  }
};
