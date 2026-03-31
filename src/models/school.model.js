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
            //ajout du directeur de l'école
            director_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            schedule:{
                type: DataTypes.STRING,
                allowNull: true,    

            },
        },
        {
            tableName: "schools",
            timestamps: true,
        }
    );

    School.associate = (models) => {
        // Une école a plusieurs enseignants
        School.hasMany(models.User, {
            foreignKey: "id_school",
            as: "users",
        });

        // Une école a plusieurs classes
        School.hasMany(models.Classe, {
            foreignKey: "id_school",
            as: "classes",
        });
    };

    return School;
}
