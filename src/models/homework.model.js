import { DataTypes } from "sequelize";

export default function homeworkModel(sequelize) {
  const Homework = sequelize.define(
    "Homework",
    {
      id_homework: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      classe_id: {
        type: DataTypes.BIGINT,
        allowNull: false//chaque devoir liécà une classe
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      fichier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {
      tableName: "homeworks",
      timestamps: true
    }
  );
//associations
  Homework.associate = (models) => {

    Homework.belongsTo(models.Classe, { foreignKey: "classe_id" ,
      as: "classe",
      onDelet:"CASCADE",
      onUpdate:"CASCADE",
    });
  };

  return Homework;
}
