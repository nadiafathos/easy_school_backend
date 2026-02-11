import { DataTypes } from "sequelize"; 

export default function classModel(sequelize) {
    //definition

const Classe =sequelize.define(
    "Classe",
    {
        id_classe:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey :true,

        
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

//definition des associations

Classe.associate=(models) => {

    // une classe a un seul enseignant
    Classe.belongsTo(models.User,{
        foreignKey:"enseignant_id",
        as:"enseignant",

        onDelete:"CASCADE",
        onUpdate:"CASCADE",
    });

    //une classe a plusieurs enfants

    Classe.hasMany(models.Child,{foreignKey:"classe_id",
        as :"children"
    });

    //une classe peut avoir plusieurs devoirs

    Classe.hasMany(models.Homework,{foreignKey:"classe_id",
        as:"homework",
    });
};
return Classe;
}
