'use strict';

module.exports={
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id_event: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      lieu: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      materiel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cout: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('events');
  },
};
