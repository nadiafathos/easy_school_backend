/**
 * Ce fichier définit le modèle de données pour les notifications dans l'application.
 * Il utilise Sequelize pour définir la structure de la table "notifications" dans la base de données.
 * Le modèle inclut les champs suivants : id_notification, message, date, read, user_id.
 * Il définit également les associations avec le modèle User (une notification appartient à un utilisateur).
 * Ce modèle est utilisé pour interagir avec la table "notifications" dans la base de données et effectuer des opérations CRUD sur les notifications.
 */

import { DataTypes } from "sequelize";

export default function notificationModel(sequelize) {  
    const Notification = sequelize.define(
    "Notification",
    {
      id_notification: {
        type: DataTypes.BIGINT,         
        autoIncrement: true,
        primaryKey: true
      },
      user_id:{
        type: DataTypes.BIGINT,
        allowNull: false
      },
      type:{
        type: DataTypes.ENUM(
            "meal",
            "homework",
            "homework_submission",
            "homework_done",
            "event",
            "event_reminder",
            "presence",

            "absence",
        ),
        allowNull: false
    },

        message: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        entity_id:{
            type: DataTypes.BIGINT,
            allowNull: true
        },
        is_read:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false
        }
        },
        {
        tableName: "notifications",
        timestamps: true,// createdAt et updatedAt
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);
    
  
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }); 
};
return Notification;

        }

    