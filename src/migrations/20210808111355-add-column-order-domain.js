'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('domains',
     'order',{ 
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
     },
     );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('domains', 'order');
  }
};
