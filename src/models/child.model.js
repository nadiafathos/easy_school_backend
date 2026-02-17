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
  };

  return Child;
}