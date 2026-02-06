'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('participation_events', {
      id_participation: {
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
      event_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id_event',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      statut: {
        type: Sequelize.ENUM('autorisé','refusé','en attente'),
        defaultValue: 'en attente',
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
    await queryInterface.dropTable('participation_events');
  },
};
