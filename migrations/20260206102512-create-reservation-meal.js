'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservation_meals', {
      id_reservation: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      child_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'childs',
          key: 'id_child',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      meal_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'meals',
          key: 'id_meal',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      type_repas: {
        type: Sequelize.ENUM('porc', 'sans porc', 'poisson'),
        allowNull: false,
      },
      absence: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservation_meals');
  },
};
