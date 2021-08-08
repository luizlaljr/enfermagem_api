'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('diagnostics',
     'populations',{ 
      type: Sequelize.TEXT,
      allowNull: true,
     },
     );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('diagnostics', 'populations');
  }
};
