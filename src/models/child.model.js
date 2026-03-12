
/**
 *  Ce fichier définit le modèle Sequelize pour l'entité "Child" (Enfant) dans l'application Easy School.
 *  Il utilise le module 'sequelize' pour définir la structure de la table "children" dans la base de données.
 *  Le modèle inclut les champs suivants : id_child, nom,prenom,date de naissance classe_id, parent_id.
 *  Il définit également les associations avec les autres modèles (Classe, User, ReservationMeal, ParticipationEvent).
 *  Ce modèle est utilisé pour interagir avec la table "children" dans la base de données et effectuer des opérations CRUD sur les enfants.
 * relations
 * -belongsTo Classe (classe_id)
 * -belongsTo User (parent_id)
 * -hasMany ReservationMeal (child_id)
 * -hasMany ParticipationEvent (child_id)
 * -hasMany Attendance (child_id)
 * hasMany HomeworkSubmission (child_id)
 * 
 */
import { DataTypes } from "sequelize";

export default function childModel(sequelize) {
  const Child = sequelize.define(
    "Child",
    {
      id_child: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      

      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:" "
      },
      date_naissance: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue:DataTypes.NOW
      },

      classe_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      parent_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    },
    {
      tableName: "children",   // correspond à la table renommée
      timestamps: true
    }
  );

  Child.associate = (models) => {
    // Un enfant appartient à une classe
    Child.belongsTo(models.Classe, {
      foreignKey: "classe_id",
      as: "classe"
    });

    // Un enfant appartient à un parent
    Child.belongsTo(models.User, {
      foreignKey: "parent_id",
      as: "parent"
    });

    // Un enfant a plusieurs réservations de repas
    Child.hasMany(models.ReservationMeal, {
      foreignKey: "child_id"
    });

    // Un enfant participe à plusieurs événements
    Child.hasMany(models.ParticipationEvent, {
      foreignKey: "child_id"
    });

      // Un enfant a plusieurs présences
    Child.hasMany(models.Attendance, {
      foreignKey: "child_id",
      as 
:     "attendances" }); 

    
    // un enfant a plusieurs soumissions de devoirs
    Child.hasMany(models.HomeworkSubmission, {
      foreignKey: "child_id",
      as: "homeworkSubmissions"
    });
  };
  

  return Child;
}