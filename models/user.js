'use strict';
const {
  Model
} = require('sequelize');
const { defaultValueSchemable } = require('sequelize/lib/utils');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nom: {
      type:DataTypes.STRING,
    allowNull:false //nom obligatoire
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true //validation automatique
      }
    },
    password: {
    type:DataTypes.STRING,
    allowNull:false
    },

    
  
  role:{
    type:DataTypes.ENUM('parent','enseignant','admin'),
    allowNull:false,
    defaultValue:'parent'
  }
    },
  
  
  {
    sequelize,
    modelName: 'User',
    tableName:'users'
//nom reel en db
  }
);
  return User;
};