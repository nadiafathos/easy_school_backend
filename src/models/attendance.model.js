/**
 * Modèle Sequelize pour la table "attendance" dans la base de données d'Easy School.
 * Ce modèle définit la structure de la table "attendance" avec les champs suivants :
 * - id_attendance : identifiant unique de l'enregistrement de présence (clé primaire, auto-incrémentée)        
 */

import { DataTypes } from "sequelize";

export default function attendanceModel(sequelize) {    
    const Attendance = sequelize.define(
    "Attendance",
    {

        id_attendance: {    

        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true        
        },
        child_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        heure_arrivee: {
            type: DataTypes.TIME,
            allowNull: true
    },
        heure_depart: {
            type: DataTypes.TIME,
            allowNull: true
    },
},
{

        tableName: "attendance",        
        timestamps: true, // createdAt et updatedAt
        createdAt: "created_at",
        updatedAt: "updated_at"
        }
    );
    Attendance.associate = (models) => {
        Attendance.belongsTo(models.Child, {
            foreignKey: "child_id",
            as: "child",    
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };
    return Attendance;
}   
