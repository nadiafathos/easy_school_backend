'use strict';
module.exports={
  async up(queryInterface,Sequelize)
  {
    //creation de la table "classes"
   await queryInterface.createTable('classes', {
      id_classe: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      enseignant_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users', // clé étrangère vers users
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
    // Supprime la table si on veut revenir en arrière
    await queryInterface.dropTable('classes');
  },
}; 
  
