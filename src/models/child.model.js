import { DataTypes } from "sequelize";


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

        Child.belongsTo(models.Classe,{foreignKey:"classe_id", as:"classe",
        });

        Child.belongsTo(models.User,{foreignKey:"parent_id",
            as:"parent"
        }),
        // un enfant a plusieurs reservations de repas
        Child.hasMany(models.ReservationMeal,{foreignKey:"child_id"});
        
        //un enfant participe à plusieurs evenements

        Child.hasMany(models.ParticipationEvent,{foreignKey:"child_id"});
    };
    return Child;
}