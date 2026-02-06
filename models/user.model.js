import {Datatypes} from "sequelize";

export default function userModel(sequelize) {
  const User =sequelize.define('user',
    {
      id_user:{
        type:Datatypes.BIGINT,
        autoIncrement:true,
        primaryKey:true},
        nom:{
          type:Datatypes.STRING,
          allowNull:false
        },
        email: {
          type:Datatypes.STRING,
          allowNull:false,
          unique:false,
          unique:true,
          validate:{isEmail:true}
        },
        password:{
          type:Datatypes.STRING,
          allowNull:false

        },
        role:{
          type:Datatypes.Enum('parent','enseignant','admin'),
            allowNull:false,
            defaulValue:'parent'

        } 
      },
    {
      tableName:'users',
      timestamps:true
    }
  );
  //Associations()
  User.associate =(models) => {
    User.hasMany(models.Classe,{foreignKey:'enseignant_id'});
    User.hasMany(models.Child,{foreignKey:'parent_id'});
  };
  return User;

}