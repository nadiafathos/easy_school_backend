'use strict';

module.exports={
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('homeworks', {
      id_homework: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      classe_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id_classe',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fichier: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('homeworks');
  },
};
