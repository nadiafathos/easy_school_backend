import { DataTypes } from "sequelize";
import { noTrueLogging } from "sequelize/lib/utils/deprecations";
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
    Meal.associate =(models) => {
        Meal.hasMany(models.ReservationMeal,{foreignKey:"meal_id"});
    };
    return Meal;
}