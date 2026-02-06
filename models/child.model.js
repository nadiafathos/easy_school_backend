import { DataTypes } from "sequelize";
import { noTrueLogging } from "sequelize/lib/utils/deprecations";

export default function childModel(sequelize){
    const Child =sequelize.define(
        "Child",
        {
            id_child:{
                type:DataTypes.BIGINT,
                autoIncrement:true,
                primaryKey:true
            },
            nom:{
                type:DataTypes.BIGINT,
                allowNul:false
            },
            classe_id:{
                type:DataTypes.BIGINT,
                allowNul:false
            },
            parent_id:{
                type:DataTypes.BIGINT,
                allowNul:false
            }
        },
        {
            tableName:"children",
            timestamps:true
        }
    );
//un enfant appartient à un parent
    Child.associate =(models) =>{
        Child.belongsTo(models.Classe,{foreignKey:"classe_id"});
        Child.belongsTo(models.User,{foreignKey:"parent_id",
            as:"parent"
        }),
        //
        Child.hasMany(models.ReservationMeal,{foreignKey:"child_id"});
        Child.hasMany(models.ParticipationEvent,{foreignKey:"child_id"});
    };
    return Child;
}