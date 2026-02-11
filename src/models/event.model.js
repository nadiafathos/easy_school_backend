import { DataTypes } from "sequelize";

/**represente un evenevement auquel les enfants peuvent participer */



export default function eventModel(sequelize) {
  const Event = sequelize.define(
    "Event",
    {
      id_event: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      titre:{ 
        type:DataTypes.STRING,
      allowNull:false,
    },

      date:{

      type: DataTypes.DATEONLY,
      allowNull:false,
      },

      lieu:{
        type: DataTypes.STRING,
        allowNull:false,
      },

      materiel: {
        type:DataTypes.STRING,
        allowNull:true,//optionnel
      },

      cout:{
              type: DataTypes.FLOAT,
              allowNull:true,
      },
    },
    {
      tableName: "events",
      timestamps: true
    }
  );

  //associations


  Event.associate = (models) => {
    Event.hasMany(models.ParticipationEvent, { foreignKey: "event_id" ,
      as:"participations",
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
    });
  };

  return Event;
}
