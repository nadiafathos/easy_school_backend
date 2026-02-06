'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id_user: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false, // nom obligatoire
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // pas deux emails identiques
        validate: {
          isEmail: true, // vérifie le format email
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('parent', 'enseignant', 'admin'),
        allowNull: false,
        defaultValue: 'parent',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // date actuelle par défaut
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    // supprime la table en cas de rollback
    await queryInterface.dropTable('users');
  },
};
