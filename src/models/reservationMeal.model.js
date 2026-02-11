import { DataTypes } from "sequelize";

export default function reservationMealModel(sequelize) {
  const ReservationMeal = sequelize.define(
    "ReservationMeal",
    {
      id_reservation: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      child_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      meal_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      type_repas: {
        type: DataTypes.ENUM("porc", "sans porc", "poisson"),
        allowNull: false
      },
      absence: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: "reservation_meals",
      timestamps: true
    }
  );

  //association

  ReservationMeal.associate = (models) => {
    //une reservation pour un enfant
    ReservationMeal.belongsTo(models.Child, { foreignKey: "child_id",
      as:"child",
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
     });
     //reservation pour un repas
    ReservationMeal.belongsTo(models.Meal, { foreignKey: "meal_id" ,
      as:"meal",
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
    });
  };

  return ReservationMeal;
}
