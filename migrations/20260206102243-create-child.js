'use strict';



module.exports= {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('childs', {
      id_child: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
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
      parent_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
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
    await queryInterface.dropTable('childs');
  },
};
