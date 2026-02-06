import { DataTypes } from "sequelize";
import { sequelize } from ".";
const Classe =sequelize.define(
    "Classe",
    {
        id_classe:{
            type:DataTypes.BIGINT,
            autoIncrement:true,

        
        },
        nom:{
            type:DataTypes.STRING,
            allowNull:false
        },
        enseignat_id:{
            type:DataTypes.BIGINT,
            allowNull:false
        }
    },
    {
        tableName:"classes",
        timestamps:true
    }
);
Classe.associate=(models) => {
    Classe.BelongsTo(models.User,{
        foreignKey:"enseignat_id",
        as:"enseignant"
    });
    Classe.hasMany(models.Child,{foreignKey:"classe_id"});
    Classe.hasMany(models.Homework,{foreignKey:"classe_id"});
};
return Classe;
