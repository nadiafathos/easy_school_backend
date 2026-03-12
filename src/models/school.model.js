/**
 * modele School 
 * represente une école dans le système
 * contient des informations générales sur l'école
 * et peut être lié à d'autres modèles comme User (enseignants), Classe, etc.
 */
import { DataTypes } from "sequelize";

export default function schoolModel(sequelize) {
    const School = sequelize.define(
        "School",
        {
            id_school: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        address: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        phone: {
            type: DataTypes.STRING,     
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,  
            allowNull: false,           
        },
        },
        {
            tableName: "schools",
            timestamps: true,
        }
    );  
    School.associate = (models) => {
        // Une école a plusieurs enseignants (users avec rôle enseignant)
        School.hasMany(models.User, {
            foreignKey: "id_school",
            as: "users",
        });
    };  
    /**
     * Associations :
     * - une  ecole  a plusieurs classes*/

    School.hasMany(models.Class, {
        foreignKey: "id_school",
        as: "classes",
    });
    
    
    return School;
}
