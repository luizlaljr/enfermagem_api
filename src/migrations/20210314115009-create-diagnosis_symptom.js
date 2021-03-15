'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('diagnosis_symptom', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      diagnosis_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'diagnostics',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      symptom_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'symptoms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('diagnosis_symptom');

  }
};
