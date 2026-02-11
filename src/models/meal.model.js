import { DataTypes } from "sequelize";


export default function mealModel(sequelize) {
    const Meal =sequelize.define(
        "Meal",
        {
            id_meal:{
                type:DataTypes.BIGINT,
                autoIncrement:true,
                primaryKey:true
            },
            date:{
                type:DataTypes.DATEONLY,
                allowNull:false
            },
            description:{
                type:DataTypes.STRING,
                allowNull:false
            },
            description:{
              type:DataTypes.STRING,
              allowNull:false  
            },
            allergenes:{
                type:DataTypes.STRING,
                allowNull:true
            }
        },
        {
            tableName:"meals",
            timestamps:true
        }
    );

    //association 

    Meal.associate =(models) => {
        Meal.hasMany(models.ReservationMeal,{foreignKey:"meal_id",
            as:"reservations",
            onDelete:"CASCADE",
            onUpdate:"CASCADE",
        });
    };
    return Meal;
}